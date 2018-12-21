
// 规则：
// 当节点类型相同时，看属性是否相同，不同产生一个属性得补丁包
// {
//     type:'Attrs',
//     attr:{class:'list-group'}
// }

// 新的dom节点不存在 删除
// 节点类型不相同 直接采用替换  新的替换旧的
// 文本节点 文本内容不一样 替换
function diff(oldTree,newTree){
    let patches = {};
    let index = 0;
    // 递归树 比较后得结果放到补丁包
    walk(oldTree,newTree,index,patches)
    return patches;
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPALACE = 'REPALACE';
let Index = 0;
function walk(oldNode,newNode,index,patches){
    let currentPatch = [];
    if(!newNode){
        currentPatch.push({
            type:REMOVE,
            text:newNode
        })
    }
    // 判断节点是不是字符串
    else if(isString(oldNode) && isString(newNode)){//判断文本是否变化
        if(oldNode !== newNode){
            currentPatch.push({
                type:TEXT,
                newNode
            })
        }
    }else if(oldNode.type === newNode.type){
        // 比较属性是否有修改
        let attrs = diffAttr(oldNode.props,newNode.props);

        // 有修改了 才会打入patches
        if(Object.keys(attrs).length){
            currentPatch.push({
                type:ATTRS,
                attrs
            })
        }
        // 如果有儿子节点遍历儿子
        diffChildren(oldNode.children,newNode.children,index,patches)
    }else{
        // 节点替换
        currentPatch.push({
            type:REPALACE,
            newNode
        })
    }
    // index 第几层得索引
    if(currentPatch.length){
        patches[index] = currentPatch;
    }
}
function isString(node){
    return Object.prototype.toString.call(node) === '[object String]';
}
function diffChildren (oldChildren,newChildren,index,patches){
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child,idx) => {
        // 索引不应该是index
        // index 每次传递为walk时候index递增
        walk(child,newChildren[idx],++Index,patches)
    });
}
function diffAttr(oldAttrs,newAttrs){
    let patch = {};
    // 判断老的属性和新的属性关系
    for(let key in oldAttrs){
        if(oldAttrs[key] !== newAttrs[key]){
            patch[key] = newAttrs[key];//有可能undefined
        }
    }
    // 老节点没有新节点属性
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}
export {diff}