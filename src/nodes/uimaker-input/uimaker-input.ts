import { Red, NodeProperties, Node } from 'node-red'
import { CustomNode } from '../uimaker-config/uimaker-config'

interface Properties extends NodeProperties {
  host: string
  server: string
  identifier: string
}

interface Message {
  topic: string
  payload: unknown
}

// prettier-ignore
const node = (RED: Red) => function (config: Properties) {
  RED.nodes.createNode(this, config)

  // @ts-ignore
  const server: CustomNode = RED.nodes.getNode(config.server);
  
  const onInput = (msg: Message) => {
    server.update(config.identifier, msg.payload);
  };

  this.on('input', onInput);

  const onOutput = (data) => {
    if (data.nodeId !== config.identifier) return;
    this.send({ payload: data.payload });
  }

  server.emitter.on('event', onOutput);
}

module.exports = (RED: Red) => {
  RED.nodes.registerType('uimaker-input', node(RED))
}
