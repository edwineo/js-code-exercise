// 将虚拟 Dom 转化为真实 Dom
// JSON 格式的虚拟 Dom 怎么转换成真实 Dom

// {
//   tag: 'DIV',
//   attrs: {
//     id:'app'
//   },
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

{/* <div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div> */}

function render (vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode))
  }
  if (vnode === null || vnode === undefined || typeof vnode === 'boolean') {
    return document.createTextNode('')
  }

  // 普通 node
  const dom = document.createElement(vnode.tag)
  if (vnode.attrs) {
    Object.keys(vnode.attrs || []).forEach((key) => {
      dom.setAttribute(key, vnode.attrs[key])
    })
  }
  (vnode.children || []).forEach((child) => dom.appendChild(render(child)))

  return dom
}