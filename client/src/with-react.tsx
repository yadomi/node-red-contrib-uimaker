import { useEffect, useState } from "react";
import { Node } from './uimaker'

/**
 * Allows you to receive data from the passed Node and get a function to dispatch data.
 * 
 * @param node A previously created Node instance.
 */
export function useNode(node: Node): [any, Node["dispatch"]] {
    const [value, setValue] = useState(null);

    useEffect(() => {
        function onChange(value) {
            setValue(value);
        }

        return node.subscribe(onChange)
    })

    return [value, node.dispatch];
}