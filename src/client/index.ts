export default function createNode (nodeId: string) {
  const es = new EventSource('/uimaker-stream')
  console.log({ es })
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
    update(data[nodeId])
  })

  es.addEventListener('update', event => {
    if (!(event instanceof MessageEvent)) return

    const data = JSON.parse(event.data)

    if (data.nodeId === nodeId) {
      update(data.payload)
    }
  })

  return {
    dispatch (value: unknown) {
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
    subscribe (listener: (value: unknown) => any) {
      listeners.push(listener)
      const unsubscribe = () => {
        listeners = listeners.filter(l => l !== listener)
      }

      return unsubscribe
    }
  }
}

import './hook.tsx'
