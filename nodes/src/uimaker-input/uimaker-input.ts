import { NodeInitializer, NodeConstructor, NodeDef, Node } from "node-red";
import { CustomNode } from "../types";

interface Config extends NodeDef {
  host: string;
  server: string;
  identifier: string;
}

interface Message {
  topic: string;
  payload: unknown;
  identifier?: string;
}

const nodeInit: NodeInitializer = (RED): void => {
  const node: NodeConstructor<Node, Config, Record<string, never>> = function (config) {
    RED.nodes.createNode(this, config);

    // @ts-ignore
    const server: CustomNode = RED.nodes.getNode(config.server);

    const onInput = (msg: Message) => {
      server.update(msg.identifier || config.identifier, msg.payload);
    };

    // @ts-ignore
    this.on("input", onInput);
  };

  RED.nodes.registerType("uimaker-input", node);
};

export = nodeInit;
