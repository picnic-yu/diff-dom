
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
function walk(oldNode,newNode,index,patches){
    let currentPatch = [];
    if(oldNode.type === newNode.type){
        // 比较属性是否有修改
        let attrs = diffAttr(oldNode.props,newNode.props);

        // 有修改了 才会打入patches
        if(Object.keys(attrs).length){
            currentPatch.push({
                type:ATTRS,
                attrs
            })
        }
        console.log(attrs)
        console.log(currentPatch)
    }
    // index 第几层得索引
    if(currentPatch.length){
        patches[index] = currentPatch;
    }
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