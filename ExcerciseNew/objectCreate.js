// 实现 Object.create

// 简单版
function simpleObjectCreate (proto) {
  function F () {}
  F.prototype = proto
  return new F()
}

// 扩展版
function objectCreate (proto, propsObj) {
  if (typeof proto !== 'object' && typeof proto !== 'function' && proto !== null) {
    throw new TypeError('should be function or object')
  }

  let obj

  if (proto === null) {
    // 因为当 F.prototype = null 时，Object.getPrototypeOf(obj) 的结果是 Object.getPrototypeOf(obj)，所以这里是在特殊处理 null 原型
    obj = {}
    Reflect.setPrototypeOf(obj, null)
  } else {
    function F () {}
    F.prototype = proto
    obj = new F()
  }

  if (propsObj) {
    Object.defineProperties(obj, propsObj)
  }

  return obj
}
