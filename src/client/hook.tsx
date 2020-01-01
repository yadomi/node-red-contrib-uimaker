import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import createNode from './index'

function useNode(node: ReturnType<typeof createNode>) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        function onChange(value: any) {
            setValue(value);
        }

        return node.subscribe(onChange)
    })

    return [value, node.dispatch];
}

const node = createNode("uimaker-input");

const A = () => {
    const [value, dispatch] = useNode(node);
    const onClick = () => {
        dispatch(new Date().getTime());
    };

    return <div>
        Value: {value}<br />
        Dispatch: <button onClick={onClick} >Value</button>
    </div>
}

ReactDOM.render(<A />, document.getElementById("root")
);