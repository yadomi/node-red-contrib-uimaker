export interface Node {
  dispatch: (value: string | number | boolean) => Promise<Response>
  subscribe: (
    listener: (value: string | number | boolean) => void
  ) => () => void
}

export const configure = (host: string) => (nodeId: string): Node => {
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
    if (data[nodeId]) {
      update(data[nodeId])
    }
  })

  es.addEventListener('update', event => {
    if (!(event instanceof MessageEvent)) return

    const data = JSON.parse(event.data)

    if (data.nodeId === nodeId) {
      update(data.payload)
    }
  })

  return {
    dispatch (value) {
      const message = {
        nodeId: nodeId,
        payload: value
      }

      return fetch('/uimaker-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      })
    },
    subscribe (listener) {
      listeners.push(listener)
      const unsubscribe = () => {
        listeners = listeners.filter(l => l !== listener)
      }

      return unsubscribe
    }
  }
}