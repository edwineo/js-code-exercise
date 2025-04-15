function listToTree (arr) {
  const nodeMap = {}
  const treeList = []
  const len = arr.length
  // 需要首先记录一遍根节点 id，不能一边遍历一遍记录，这样子前面的子节点就没法插入后面的根节点
  for (let i = 0; i < len; i++) {
    nodeMap[arr[i].id] = arr[i]
  }

  // 遍历，将子节点插入父节点中
  for (let i in nodeMap) {
    const curNode = nodeMap[i]
    const curParentId = curNode.parentId
    if (curParentId) {
      // 有父节点
      if (!nodeMap[curParentId]) {
        treeList.push(curNode)
        continue
      }
      // 保证列表中一定有父节点存在的情况下，给父节点创建 children
      if (nodeMap[curParentId].children) {
        nodeMap[curParentId].children.push(curNode)
      } else {
        nodeMap[curParentId].children = [curNode]
      }
    } else {
      // 无父节点，到顶了
      treeList.push(curNode)
    }
  }

  return treeList
}

const arr = [
  {
    id: 1,
    text: '节点1',
    parentId: 0 //这里用0表示为顶级节点
  },
  {
    id: 2,
    text: '节点1_1',
    parentId: 1 //通过这个字段来确定子父级
  },
  {
    id: 3,
    text: '节点1_2',
    parentId: 1 //通过这个字段来确定子父级
  },
  {
    id: 5,
    text: '节点5',
    parentId: 0 //通过这个字段来确定子父级
  },
  {
    id: 6,
    text: '节点5_1',
    parentId: 5 //通过这个字段来确定子父级
  }
]
const tree = listToTree(arr)
console.log(tree)
for (let item of tree) {
  console.log(item)
}

// 树形转成列表结构
// 每当嵌套结构需要拍平时，就一定要用递归与回溯

function treeToList (treeList) {
  const res = []

  const dfs = (tree) => {
    const len = tree.length
    for (let i = 0; i < len; i++) {
      const curTree = tree[i]
      if (curTree.children) {
        // 有子节点，则递归，这里递归的作用只是为了删除所有 children，下面的 push 操作才是为了铺平
        dfs(curTree.children)
        delete curTree.children
      }
      // 没有子节点，则直接平铺
      // 这里不能用 else 逻辑，因为根节点有 children，但也需要 push 进去
      res.push(curTree)
    }
  }

  dfs(treeList)
  return res
}

const treeList = [
  {
    id: 1,
    text: '节点1',
    parentId: 0,
    children: [
      {
        id:2,
        text: '节点1_1',
        parentId:1
      }
    ]
  }
]
console.log('treeToList', treeToList(treeList))