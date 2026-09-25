// 手写 instanceof

function instanceOf (instance, cclass) {
  let proto = Object.getPrototypeOf(instance)

  while (true) {
    if (!proto) {
      return false
    }
    if (proto === cclass.prototype) {
      return true
    } else {
      proto = Object.getPrototypeOf(proto)
    }
  }
}

const obj = {}
function func () {}
const a = 1
console.log(instanceOf(func, Function))