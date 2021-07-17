import { configure } from "../uimaker-client";

global.EventSource = jest.fn(() => ({
  addEventListener: jest.fn(),
}));

describe("configure", () => {
  it("return a function", () => {
    const createNode = configure("https://localhost");
    expect(typeof createNode).toBe("function");
  });
});

describe("createNode", () => {
  it("should return dispatch and subcribe", () => {
    const createNode = configure("https://localhost");
    const node = createNode("myNode1");

    expect(node).toHaveProperty("dispatch");
    expect(typeof node.dispatch).toBe("function");

    expect(node).toHaveProperty("subscribe");
    expect(typeof node.subscribe).toBe("function");
  });
});

describe("dispatch", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((...args) => Promise.resolve(args));
  });

  const createNode = configure("https://localhost");

  it("should return a promise", () => {
    const node = createNode("myNode1");
    const result = node.dispatch(42);
    expect(result instanceof Promise).toBe(true);
  });

  it("should make a POST request when called", () => {
    const node = createNode("myNode1");
    const result = node.dispatch(42);

    result.then((args) => {
      expect(args[1].method).toBe("POST");
    });
  });

  it("should stringify the body", () => {
    const node = createNode("myNode1");
    const result = node.dispatch(42);

    result.then((args) => {
      expect(typeof args[1].body).toBe("string");
      expect(args[1].body).toBe('{"identifier":"myNode1","payload":42}');
    });
  });

  it("should pass the node identifier in the body", () => {
    const node = createNode("myNode1");
    const result = node.dispatch(42);

    result.then((args) => {
      const body = JSON.parse(args[1].body);
      expect(body).toHaveProperty("identifier");
      expect(body.identifier).toBe("myNode1");
    });
  });

  it("should match the snapshot", () => {
    const node = createNode("myNode1");
    const result = node.dispatch(42);

    result.then((args) => {
      expect(args).toMatchSnapshot();
    });
  });
});

describe("subscribe", () => {
  beforeEach(() => {
    global.EventSource = jest.fn();
    global.EventSource.listeners = {};

    const events = global.EventSource.listeners;
    global.EventSource.mockImplementation(() => ({
      addEventListener: (type, cb) => {
        events[type] ? events[type].push(cb) : (events[type] = [cb]);
      },
    }));

    global.EventSource.call = (type, data) =>
      global.EventSource.listeners[type].forEach((cb) => {
        const event = { type, data: JSON.stringify(data) };
        cb(event);
      });
  });

  const createNode = configure("https://localhost");

  it("should return unsubcribe function", () => {
    const node = createNode("myNode1");
    const unsubscribe = node.subscribe(() => {});
    expect(typeof unsubscribe).toBe("function");
  });

  it("should call the listener on init", () => {
    const node = createNode("myNode1");

    const listener = jest.fn();
    node.subscribe(listener);

    global.EventSource.call("init", { myNode1: 42 });
    expect(listener).toHaveBeenCalledWith(42);
  });

  it("should call the listener on update", () => {
    const node = createNode("myNode1");

    const listener = jest.fn();
    node.subscribe(listener);

    global.EventSource.call("update", { nodeId: "myNode1", payload: 42 });
    expect(listener).toHaveBeenCalledWith(42);
  });

  it("should only call listeners that match the nodes identifier", () => {
    const { subscribe } = createNode("myNode1");
    const listener = jest.fn();
    subscribe(listener);

    global.EventSource.call("init", { nodeId: "myNode2" });
    global.EventSource.call("update", { nodeId: "myNode2", payload: 42 });
    expect(listener).not.toHaveBeenCalled();
  });

  it("should not update if event is not of a MessageEvent", () => {});

  it("should no longer call the listener once unsubcribed", () => {
    const node = createNode("myNode1");

    const listener = jest.fn();
    const unsubscribe = node.subscribe(listener);

    global.EventSource.call("update", { nodeId: "myNode1" });
    unsubscribe();

    global.EventSource.call("update", { nodeId: "myNode1" });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
