export interface Node {
  /**
   * Dispatch to NodeRED
   * @param value Something that can be stringified to send to NodeRED
   * @returns The NodeRED http response
   */
  dispatch: (value: string | number | boolean) => Promise<Response>;

  /**
   * Attach a listener
   * @param listener a callback function to called when a node receive an event from NodeRED
   * @returns an unsubcribe function
   */
  subscribe: (listener: (value: string | number | boolean) => void) => void;
}

/**
 * Configure uimaker and return a configurator function to create nodes
 * @param host The URL and port to NodeRED (eg: http://localhost:1880)
 * @returns A configurator function to create nodes instance
 */
export const configure =
  (host: string) =>
  (identifier: string): Node => {
    const es = new EventSource(new URL("/uimaker-stream", host).href);
    let listeners: Function[] = [];

    es.onerror = (err) => console.log({ err });

    const update = (value) => {
      listeners.forEach((listener) => {
        listener(value);
      });
    };

    es.addEventListener("init", (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data[identifier]) {
        update(data[identifier]);
      }
    });

    es.addEventListener("update", (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.nodeId === identifier) {
        update(data.payload);
      }
    });

    return {
      dispatch(value) {
        const message = {
          identifier: identifier,
          payload: value,
        };

        return fetch(new URL("/uimaker-input", host).href, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      },
      subscribe(listener) {
        listeners.push(listener);
        const unsubscribe = () => {
          listeners = listeners.filter((l) => l !== listener);
        };

        return unsubscribe;
      },
    };
  };
