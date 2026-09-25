// 树型结构转为列表
// 树形结构转列表本质是一次 DFS/BFS 遍历
// - 用递归实现最直观
// - 也可以用栈或队列实现非递归版本。

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

// 转成
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

function treeToList (tree) {
  const res = []

  function dfs (tree) {
    tree.forEach((item) => {
      // obj 的 rest 的规则：把剩下所有可枚举属性，组成一个新对象 rest，所以 rest 还是一个对象
      const { children, ...rest } = item
      res.push(rest)
      if (children?.length) {
        dfs(children)
      }
    })
  }

  dfs(tree)

  return res
}

// 嵌套结构拍平时，一定是递归
function treeToList2 (tree) {
  const list = []

  function dfs (tree) {
    tree.forEach((item) => {
      list.push(item)
      if (item.children.length) {
        dfs(item.children)
      }
    })
  }

  dfs(tree)

  return list
}
