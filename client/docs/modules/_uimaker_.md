[uimaker-client - v1.0.0](../README.md) › ["uimaker"](_uimaker_.md)

# External module: "uimaker"

## Index

### Interfaces

* [Node](../interfaces/_uimaker_.node.md)

### Type aliases

* [createNode](_uimaker_.md#createnode)

### Functions

* [configure](_uimaker_.md#const-configure)

## Type aliases

###  createNode

Ƭ **createNode**: *function*

*Defined in [uimaker.ts:8](https://github.com/yadomi/node-red-contrib-uimaker/blob/431be5f/client/src/uimaker.ts#L8)*

#### Type declaration:

▸ (`identifier`: string): *[Node](../interfaces/_uimaker_.node.md)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

## Functions

### `Const` configure

▸ **configure**(`host`: string): *[createNode](_uimaker_.md#createnode)*

*Defined in [uimaker.ts:14](https://github.com/yadomi/node-red-contrib-uimaker/blob/431be5f/client/src/uimaker.ts#L14)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`host` | string | The Node-Red server host from where your nodes are configured. (eg: `http://127.0.0.1:1880`)  |

**Returns:** *[createNode](_uimaker_.md#createnode)*
