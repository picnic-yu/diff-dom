import {createElement,render,renderDom} from './element.js'
let vertualDom = createElement('ul',{class:'list'},[
    createElement('li',{class:'list'},['a']),
    createElement('li',{class:'list'},['b']),
    createElement('li',{class:'list'},['c'])
])
let el = render(vertualDom);
renderDom(el,window.root);
console.log(el)
console.log(vertualDom)