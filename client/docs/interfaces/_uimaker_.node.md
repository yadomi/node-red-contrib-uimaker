[uimaker-client - v1.0.0](../README.md) › ["uimaker"](../modules/_uimaker_.md) › [Node](_uimaker_.node.md)

# Interface: Node

## Hierarchy

* **Node**

## Index

### Properties

* [dispatch](_uimaker_.node.md#dispatch)
* [subscribe](_uimaker_.node.md#subscribe)

## Properties

###  dispatch

• **dispatch**: *function*

*Defined in [uimaker.ts:2](https://github.com/yadomi/node-red-contrib-uimaker/blob/431be5f/client/src/uimaker.ts#L2)*

#### Type declaration:

▸ (`value`: string | number | boolean): *Promise‹Response›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; number &#124; boolean |

___

###  subscribe

• **subscribe**: *function*

*Defined in [uimaker.ts:3](https://github.com/yadomi/node-red-contrib-uimaker/blob/431be5f/client/src/uimaker.ts#L3)*

#### Type declaration:

▸ (`listener`: function): *function*

**Parameters:**

▪ **listener**: *function*

▸ (`value`: string | number | boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; number &#124; boolean |

▸ (): *void*
