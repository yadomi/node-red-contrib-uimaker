# API

## `uimaker-client`

### `configure`

The `configure` function return a function (see [`createNode`](#createNode)) that allow you to create a `Node` instance.

```ts
configure: (host: string) => (identifier: string) => Node
```

- `host`: The Node-Red server host from where your nodes are configured. (eg: `http://127.0.0.1:1880`)

#### Example

```js
import { configure } from 'uimaker-client'

const createNode = configure('http://127.0.0.1:1880')
```

### `createNode` (returned by `configure`)

`createNode` is the function returned by [`configure`](#configure). This function return a `Node` instance. See [`Node`](#node).

```js
createNode: (identifier: string) => Node
```

- `identifier`: The identifier of the node. Must be the same as configured in Node-RED node in order to receive or dispatch as this act as a topic/channel.

### `Node`

A node is an object returned by `createNode`. A node has two property, `subscribe` and `dispatch`.

#### subscribe

```ts
subscribe: (listener: (value: string | number | boolean) => void) => void
```

This property take a function that will called every time a new value is passed to the input branch of the NodeRED node matching the identifier.

#### dispatch

```ts
dispatch: (value: string | number | boolean) => Promise<Response>
```

This property send the `value` to the output branch of the NodeRED Node.
