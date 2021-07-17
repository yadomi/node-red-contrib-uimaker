import React from "react";
import ReactDOM from "react-dom";
import { configure } from "@yadomi/uimaker-client";
import { useNode } from "@yadomi/uimaker-client-react";

const createNode = configure("http://localhost:1880");
const MyNode1 = createNode("button-node");

function App() {
  const [value, dispatch] = useNode(MyNode1);

  const onClick = () => dispatch(new Date().getTime());

  return (
    <div>
      <h1>Webpack Vanilla Example</h1>
      <div>Value: {value}</div>
      <button onClick={onClick}>Click</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
