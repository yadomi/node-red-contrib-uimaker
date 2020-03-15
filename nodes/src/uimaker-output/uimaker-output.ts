import { Red, NodeProperties } from "node-red";
import { CustomNode } from "../uimaker-config/uimaker-config";

interface Properties extends NodeProperties {
  host: string;
  server: string;
  identifier: string;
}

// prettier-ignore
const node = (RED: Red) => function (config: Properties) {
  RED.nodes.createNode(this, config)

  // @ts-ignore
  const server: CustomNode = RED.nodes.getNode(config.server);

  const onOutput = (data) => {
    if (data.identifier !== config.identifier) return;
    this.send({ payload: data.payload });
  }

  server.emitter.on('event', onOutput);
}

module.exports = (RED: Red) => {
  RED.nodes.registerType("uimaker-output", node(RED));
};
