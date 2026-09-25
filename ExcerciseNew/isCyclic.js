// 实现一个 isCyclic 方法判断循环引用

// function isCyclic(obj) {
//   //...
// }
// let obj1 = { name: "前端鲨鱼哥1" };
// let obj2 = { name: "前端鲨鱼哥2" };

// // 对象1的属性引用了对象2
// obj1.obj = obj2;
// // 对象2的属性引用了对象1
// obj2.obj = obj1;

// isCyclic(obj1);

function isCyclic (obj) {
  let stackSet = new Set()

  function detect (obj) {
    if (obj === null || typeof obj !== 'object') {
      return false
    }

    if (stackSet.has(obj)) {
      return true
    }

    stackSet.add(obj)
    for (const key of Object.keys(obj)) {
      if (detect(obj[key])) {
        return true
      }
    }
    stackSet.delete(obj)

    return false
  }

  const res = detect(obj)

  return res
}

function isCyclic2 (obj) {
  const stackSet = new Set()

  function detect (obj) {
    // 递归终点
    if (typeof obj !== 'object' || !obj) {
      return false
    }
    if (stackSet.has(obj)) {
      return true
    }

    // 正常情况
    // 先序遍历
    stackSet.add(obj)
    for (const key of Object.keys(obj)) {
      // 注意这里一定要 return true
      if (detect(obj[key])) {
        return true
      }
    }
    stackSet.delete(obj)

    // 遍历完成之后，还未找到，则 return false
    return false
  }

  return detect(obj)
}
