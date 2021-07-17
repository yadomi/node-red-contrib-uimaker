import { useEffect, useState } from "react";
import { Node } from '@yadomi/uimaker-client'

type Dispatch = Node['dispatch']

/**
 * Listen and dispatch uimaker node instance with a hook
 * @param node A configured uimaker node instance
 * @returns an array with `value` being the first and `dispatch` function the second
 */
export function useNode<T>(node: Node): [T, Dispatch] {
    const [value, setValue] = useState<T>(null);

    useEffect(() => {
        function onChange(value) {
            setValue(value);
        }

        return node.subscribe(onChange)
    })

    return [
        value,
        node.dispatch
    ];
}