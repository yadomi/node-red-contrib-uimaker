import { NodeInitializer, NodeConstructor, NodeDef, Node } from "node-red";
import { ISseHubResponse } from "@toverux/expresse";

const { Hub, sseHub } = require("@toverux/expresse");
const EventEmitter = require("events");

const nodeInit: NodeInitializer = (RED): void => {
  const state = {};
  const hub = new Hub();
  const emitter = new EventEmitter();

  RED.httpNode.get("/uimaker-stream", sseHub({ hub }), (req, res: ISseHubResponse) => {
    res.sse.event("init", state);
  });

  RED.httpNode.post("/uimaker-input", (req, res) => {
    emitter.emit("event", req.body);
    res.json({ status: "ok" });
  });

  const node: NodeConstructor<Node, NodeDef, Record<string, never>> = function (config) {
    RED.nodes.createNode(this, config);

    // @ts-ignore
    this.emitter = emitter;

    // @ts-ignore
    this.update = (nodeId, value) => {
      state[nodeId] = value;
      hub.event("update", { nodeId, payload: value });
    };
  };

  RED.nodes.registerType("uimaker-config", node);
};

export = nodeInit;
