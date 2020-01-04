import { useEffect, useState } from "react";
import { Node } from './uimaker'

export function useNode(node: Node) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        function onChange(value) {
            setValue(value);
        }

        return node.subscribe(onChange)
    })

    return [value, node.dispatch];
}