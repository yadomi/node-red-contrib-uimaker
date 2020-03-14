export interface Node {
  dispatch: (value: string | number | boolean) => Promise<Response>;
  subscribe: (listener: (value: string | number | boolean) => void) => void;
}

export const configure = (host: string) => (identifier: string) => {
  const es = new EventSource(new URL("/uimaker-stream", host).href);
  let listeners: Function[] = [];

  es.onerror = err => console.log({ err });

  const update = value => {
    listeners.forEach(listener => {
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
        payload: value
      };

      return fetch(new URL("/uimaker-input", host).href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });
    },
    subscribe(listener) {
      listeners.push(listener);
      const unsubscribe = () => {
        listeners = listeners.filter(l => l !== listener);
      };

      return unsubscribe;
    }
  };
};
