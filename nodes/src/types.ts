const EventEmitter = require("events");

export interface CustomNode extends Node {
  emitter: typeof EventEmitter;
  update: (nodeId: string, value: any) => void;
}
