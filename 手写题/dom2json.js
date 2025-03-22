// 将 dom 结构转成 JSON 格式
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
function dom2Json(domtree) {
  let obj = {};
  obj.tag = domtree.tagName;
  obj.children = [];
  domtree.childNodes.forEach(child => obj.children.push(dom2Json(child)));
  return obj;
}
