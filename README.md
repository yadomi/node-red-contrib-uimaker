# node-red-contrib-uimaker

> Note: No package is not published to npm yet. Consider this package not ready.

## What is it ?

`UIMaker` allow you to create dashboard with node-red. However, `UIMaker` does not come with any UI toolkit, it's up to you to use whatever you want. Also, the client library is framework-agnostic, you can use any frontend you want or no framework at all.

This is the repostory for `uimaker` for Node-RED. It's composed of two packages:

- [`node-red-contrib-uimaker`](./nodes/), that contains the nodes to use with Node-RED
- [`uimaker-client`](./client), the client library that allow you to comunicate with the nodes from Node-RED

[![Demo](https://i.imgur.com/pylg5co.gif)](https://i.imgur.com/pylg5co.mp4)

_Click on the image for better quality_

## Documentation

- `node-red-contrib-uimaker`

  - [Introduction](./nodes#node-red-contrib-uimaker)
  - [Available `Nodes`](./nodes#nodes)

- `uimaker-client`

  - [Introduction](./client#uimaker-client)
  - [API](./client/API.md)
    - [Usage with vanilla](./client#directly)
    - [Usage with React](./client#with-react)

## What's missing ?

- Tests
- Generate TS definition
- Generate a documention with TypeDoc
- ???

## Contributing

### Installation

#### Nodes (Server side)

1. Install the dependencies for the nodes

in `nodes` directory:

```
yarn install
```

2. Start `tsc` in watch mode to compile

```
yarn dev
```

In a new terminal, add the nodes as dependencies for `node-red`:

```
yarn link
cd .node-red
yarn link node-red-contrib-uimaker
```

Then start then build-in `node-red` preconfigured with a demo flow

```
yarn node-red
```

#### Client side

1. Install the dependencies for the client library

in `client` directory:

```
yarn install
```

2. Start `rollup` in watch mode for the client library

in `client` directory:

```
yarn dev
```
