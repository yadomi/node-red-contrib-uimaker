export interface Node {
  dispatch: (value: string | number | boolean) => Promise<Response>
  subscribe: (
    listener: (value: string | number | boolean) => void
  ) => () => void
}

type createNode = (identifier: string) => Node

/**
 *
 * @param host The Node-Red server host from where your nodes are configured. (eg: `http://127.0.0.1:1880`)
 */
export const configure = (host: string): createNode => {
  /**
   *
   * @param identifier The identifier of the node.
   * Must be the same as configured in Node-RED node in order to receive or dispatch as this act as a topic/channel.
   */
  function createNode (identifier) {
    const es = new EventSource(new URL('/uimaker-stream', host).href)
    let listeners: Function[] = []

    es.onerror = err => console.log({ err })

    const update = value => {
      listeners.forEach(listener => {
        listener(value)
      })
    }

    es.addEventListener('init', event => {
      if (!(event instanceof MessageEvent)) return

      const data = JSON.parse(event.data)
      if (data[identifier]) {
        update(data[identifier])
      }
    })

    es.addEventListener('update', event => {
      if (!(event instanceof MessageEvent)) return

      const data = JSON.parse(event.data)

      if (data.identifier === identifier) {
        update(data.payload)
      }
    })

    return {
      /**
       *
       * @param value A value to send back to Node-RED. This value will be outputed to the output node that match the identifier
       */
      dispatch (value) {
        const message = {
          identifier: identifier,
          payload: value
        }

        return fetch(new URL('/uimaker-input', host).href, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        })
      },
      /**
       *
       * @param listener A function that will be called every time the node receive an input. The argument is the value
       */
      subscribe (listener) {
        listeners.push(listener)
        const unsubscribe = () => {
          listeners = listeners.filter(l => l !== listener)
        }

        return unsubscribe
      }
    }
  }

  return createNode
}
