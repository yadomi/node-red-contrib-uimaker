import { Red, NodeProperties, Node } from 'node-red'
import { ISseHubResponse } from '@toverux/expresse'

const path = require('path')
const serve = require('serve-static')
const { Hub, sseHub } = require('@toverux/expresse')
const EventEmitter = require('events')

interface Properties extends NodeProperties {
  path: string
}

export interface CustomNode extends Node {
  emitter: typeof EventEmitter
  update: (nodeId: string, value: any) => void
}

// prettier-ignore
const node = (RED: Red) => {
  const state = {}
  const hub = new Hub();
  const emitter = new EventEmitter()

  RED.httpNode.get('/uimaker-stream', sseHub({ hub }), (req, res: ISseHubResponse) => {
    res.sse.event('init', state);
  });

  RED.httpNode.post('/uimaker-input', (req, res) => {
    emitter.emit('event', req.body)
    res.json({ status: "ok" })
  })
  
  return function (this: CustomNode, config: Properties) {
    RED.nodes.createNode(this, config)

    RED.httpNode.use(config.path, serve(path.resolve(__dirname, '../../../public')))
    RED.httpNode.use(path.join(config.path, 'dist'), serve(path.resolve(__dirname, '../../../dist')))
    
    this.emitter = emitter;
    this.update = (nodeId, value) => {
      state[nodeId] = value;
      hub.event('update', { nodeId, payload: value })
    }
  }
}

module.exports = (RED: Red) => {
  RED.nodes.registerType('uimaker-config', node(RED))
}
