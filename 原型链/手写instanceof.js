function instanceOf (instance, cclass) {
  // instance.__proto__ 指向 cclass.prototype
  
  let proto = instance.__proto__
  const prototype = cclass.prototype
  // 不断的往原型链查找
  while (proto) {
    if (proto === prototype) {
      return true
    }
    proto = proto.__proto__
  }
  // 没找到则 return false
  return false
}

const obj = {}
function func () {}
const a = 1
console.log(instanceOf(func, Function))


function instanceOf (instance, cclass) {
  // 获取 instance 的原型链
  let proto = Object.getPrototypeOf(instance)
  while (true) {
    if (proto === null) {
      // 找到原型链的终点还未找到，则返回 false
      return false
    }

    if (proto === cclass.prototype) {
      return true
    } else {
      // 递归的查找原型链
      proto = Object.getPrototypeOf(proto)
    }
  }
}
