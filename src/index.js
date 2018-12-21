import {createElement,render,renderDom} from './element.js'
import {diff} from './diff.js';
import patch from './patch'
let vertualDom = createElement('ul',{class:'list ww'},[
    createElement('li',{class:'list'},['a']),
    createElement('li',{class:'list'},['b']),
    createElement('li',{class:'list'},['c'])
])

// console.log(el)
// console.log(vertualDom)


// DOM diff 比较2个虚拟dom区别  其实就是比较2个对象得区别
// dom diff 作用  根据2个虚拟对象创建出补丁对象patch，补丁就是描述改变得内容
// 将这个补丁用来更新dom

let vertualDom1 = createElement('ul',{class:'list ww'},[
    createElement('li',{class:'list 22'},['a']),
    createElement('li',{class:'list'},['b']),
    createElement('li',{class:'list'},['c'])
])

let vertualDom2 = createElement('ul',{class:'list-g ww'},[
    createElement('li',{class:'list'},['1']),
    createElement('li',{class:'list'},['b']),
    createElement('div',{class:'list'},['3'])
])





// 将虚拟dom转化成真是dom
let el = render(vertualDom);
renderDom(el,window.root);


let patchs = diff(vertualDom1,vertualDom2);
console.log(patchs)

// 打补丁 重新更新视图
patch(el,patchs)