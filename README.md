# node-red-contrib-uimaker

## What is it ?

This is the repostory for `uimaker` for Node-RED. It's composed of two package:

- [`node-red-contrib-uimaker`](./nodes/): Package that contains the nodes to use with node-red
- [`uimaker-client`](./client): The client library that allow you to comunicate with the nodes from node-red

`UIMaker` allow you to create dashboard with node-red. However, `UIMaker` does not come with any UI toolkit, it's up to you to use whatever you want. Also, the client library is framework-agnostic, you can use any frontend you want or no framework at all.

[![Demo](https://i.imgur.com/pylg5co.gif)](https://i.imgur.com/pylg5co.mp4)

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
