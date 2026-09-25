// 实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式

{/* <div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div> */}

// {
//   tag: 'DIV',
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }

function dom2json (node) {
  // 递归
  return {
    tag: node.tagName,
    children: Array.from(node.children).map(dom2json)
  }
}
// DOM 本身是树结构，每个节点的处理逻辑与其子节点完全一致
// 符合递归定义：处理当前节点，然后递归处理所有子节点。这样代码最简洁，也最符合树的 DFS 遍历模式。

// 这里实际上的递归终点是：node.children.length === 0，只是被隐式写成了：Array.from(node.children).map(...)
// 当数组为空时：[].map(...) 不会执行回调，递归自然到了终点
