function dom2Json (domTree) {
  const obj = {}
  obj.tag = domTree.tagName
  obj.children = []
  
  domTree.childNodes.forEach(node => obj.children.push(dom2Json(node)))

  return obj
}
