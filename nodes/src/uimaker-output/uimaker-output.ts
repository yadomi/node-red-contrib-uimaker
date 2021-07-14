import { NodeInitializer, NodeConstructor, NodeDef, Node } from "node-red";
import { CustomNode } from "../types";

interface Config extends NodeDef {
  host: string;
  server: string;
  identifier: string;
}

const nodeInit: NodeInitializer = (RED): void => {
  const node: NodeConstructor<Node, Config, Record<string, never>> = function (config) {
    RED.nodes.createNode(this, config);

    // @ts-ignore
    const server: CustomNode = RED.nodes.getNode(config.server);

    const onOutput = (data) => {
      if (data.identifier !== config.identifier) return;

      this.send({ payload: data.payload });
    };

    server.emitter.on("event", onOutput);
  };

  RED.nodes.registerType("uimaker-output", node);
};

export = nodeInit;
