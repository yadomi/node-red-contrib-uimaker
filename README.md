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

2. Start the compilation then watch for change

```
yarn build:watch
```

In a new terminal you can run the built-in `node-red` for easier debugging:

```
cd .node-red
yarn install
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
yarn build:watch
```
