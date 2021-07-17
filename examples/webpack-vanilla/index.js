import { configure } from 'uimaker-client';

const createNode = configure('http://localhost:1880')

const value = document.querySelector('#value');

const button = document.querySelector('#button-node');
const buttonNode = createNode(button.id);

button.addEventListener('click', () => {
    buttonNode.dispatch(new Date().getTime());
});

buttonNode.subscribe(data => {
    value.innerHTML = data
})
