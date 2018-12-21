import {createElement,Element,render} from './element.js'
let allPathes;
let index = 0;//默认哪个需要打补丁
function patch(node,patchs){
    console.log(node)
    // 给某个元素打补丁
    allPathes = patchs;
    walk(node)
}
function walk(node){
    let currentPatch = allPathes[index++];
    let childNodes = node.childNodes;
    // 深度先序
    childNodes.forEach((child) => {
        walk(child)
    });
    // 加补丁是后序得
    if(currentPatch){
        doPatch(node,currentPatch)
    }
}
function doPatch(node,patchs){
    patchs.forEach((patch) => {
        switch(patch.type){
            case 'ATTRS':
                break;
            case 'TEXT':
                console.log(node,'text')
                // if(!node){
                //     node.textContent = patch.text;

                // }
                node.textContent = patch.text;
                break;
            case 'REPALACE':
                console.log(patchs.newNode)
                let newNode = (patchs.newNode instanceof Element)?render(patchs.newNode):document.createTextNode(patchs.newNode);
                node.parentNode.replaceChild(newNode,node);
                break;
            case 'REMOVE':
                break;
            default:
                break;
        }

    })
}
export default patch;