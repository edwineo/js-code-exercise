// 列表转成树型结构

// [
//   {
//     id: 1,
//     text: '节点1',
//     parentId: 0 //这里用0表示为顶级节点
//   },
//   {
//     id: 2,
//     text: '节点1_1',
//     parentId: 1 //通过这个字段来确定子父级
//   }
//   ...
// ]

// 转成
// [
//   {
//     id: 1,
//     text: '节点1',
//     parentId: 0,
//     children: [
//       {
//         id:2,
//         text: '节点1_1',
//         parentId:1
//       }
//     ]
//   }
// ]

function listToTree (arr) {
  const nodeMap = {}
  const treeList = []

  for (let i = 0; i < arr.length; i++) {
    nodeMap[arr[i].id] = {
      ...arr[i],
      children: []
    }
  }

  Object.values(nodeMap).forEach((curNode) => {
    if (curNode.parentId) {
      // 有父节点
      const parentNode = nodeMap[curNode.parentId]
      if (parentNode) {
        parentNode.children.push(curNode)
      } else {
        treeList.push(curNode)
      }
    } else {
      // 无父节点
      treeList.push(curNode)
    }
  })

  return treeList
}

// 列表转树形，但本质两者都是列表，只不过一个是平铺，一个是嵌套结构
function listToTree2 (arr) {
  const nodeMap = {}
  const treeList = []

  for (let i = 0; i < arr.length; i++) {
    nodeMap[arr[i].id] = {
      ...arr[i],
      children: []
    }
  }

  // 这里就直接遍历 nodeMap 了
  Object.values(nodeMap).forEach((item) => {
    const parentItem = nodeMap[item.parentId]
    if (parentItem) {
      parentItem.children.push(item)
    } else {
      treeList.push(item)
    }
  })

  return treeList
}
