import { Red, NodeProperties, Node } from 'node-red'
declare const RED: any

interface Properties extends NodeProperties {
  host: string
}

function node (this: Node, config: Properties) {
  RED.nodes.createNode(this, config)

  console.log(config.host)

  this.on('input', () => {})
}

module.exports = (RED: Red) => {
  RED.nodes.registerType('uimaker-output', node)
}
