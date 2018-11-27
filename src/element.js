// 虚拟dom元素得类
class Element{
    constructor(type,props,children){
        this.type = type;
        this.props = props;
        this.children =children;
    }
}
// 设置属性
function setAttr(node,key,value){
    switch(key){
        case 'value': //node是一个input或者textarea
            if(node.tagName.toUpperCase() === 'TEXTAREA' || node.tagName.toUpperCase() === 'INPUT'){
                node.value = value;
            }else{
                node.setAttribute(key,value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key,value);
            break;
    }
}
// 返回虚拟节点得对象
function createElement (type,props,children){
    return new Element(type,props,children)
}


// render 讲虚拟dom转化真实dom
function render (eleObj) {
    let el = document.createElement(eleObj.type);
    // 设置属性
    for(let key in eleObj.props){
        //设置属性方法
        setAttr(el,key,eleObj.props[key])
    }
    // 遍历 如果是虚拟dom就继续渲染，不是就代表文本节点
    eleObj.children.forEach((child) => {
        // 判断是不是一个元素
        child = (child instanceof Element) ? render(child):document.createTextNode(child);//不是元素就创建文本节点
        el.appendChild(child);
    });
    return el;
}
// 将元素插入到页面
function renderDom(el,target){
    target.appendChild(el);
}
export {createElement, render, Element, renderDom}