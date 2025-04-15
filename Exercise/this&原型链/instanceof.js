function myInstanceof (instance, cclass) {
  let proto = Object.getPrototypeOf(instance) // instance 的原型
  // 这里已经在循环查找了
  while (true) {
    if (proto === null) {
      // 到了原型链终点
      return false
    }
    if (proto === cclass.prototype) {
      return true
    }
    // 不断往上查找
    proto = Object.getPrototypeOf(proto)
  }
}

// 示例
const obj = {}
function func () {}
const a = 1
console.log(myInstanceof(func, Function)) // true
