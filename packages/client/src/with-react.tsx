import { useEffect, useState } from "react";
import { createNode } from './uimaker'

export function useNode(node: ReturnType<typeof createNode>) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        function onChange(value: any) {
            setValue(value);
        }

        return node.subscribe(onChange)
    })

    return [value, node.dispatch];
}