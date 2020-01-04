# uimaker-client

This is the frontend library to use in conjonction with [`node-red-contrib-uimaker`](https://github.com/yadomi/node-red-contrib-uimaker).

## Usage

### Directly

`UIMaker` can be used directly without any framework. This let you choose and do whatever you want for your UI.

```js
import { configure } from 'uimaker-client'
const createNode = configure('https://localhost:1880')

const MyNode1 = createNode('my-node-1')

MyNode1.subscribe(value => console.log(value))

setInterval(() => {
  MyNode1.dispatch(new Date().getTime())
}, 5000)
```

### With React

If you want to use React, you can ! `UIMaker` come with a `useNode` hook for easier use in a React component.

Based on the example above, using an already created `MyNode1`:

```jsx
import { useNode } from 'uimaker-client/react'

const MyComponent = () => {
    const [value, dispatch] = useNode(MyNode1);

    const onClick = () => dispatch(new Date().getTime());

    return <div>
        Value: {value} - <button onClick={onClick}>Update<button>
    </div>
}
```
