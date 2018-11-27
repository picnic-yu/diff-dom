import {createElement} from './element.js'
let vertualDom = createElement('ul',{class:'list'},[
    createElement('li',{class:'list'},['a']),
    createElement('li',{class:'list'},['b']),
    createElement('li',{class:'list'},['c'])
])
console.log(vertualDom)