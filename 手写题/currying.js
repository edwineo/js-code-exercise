function currying (fn, ...args) {
  const res = (...newArgs) => {
    const allArgs = [...args, ...newArgs]
    if (allArgs.length === fn.length) {
      return fn(...allArgs) // 递归终点
    } else {
      return res
    }
  }
  return res
}

// 用法如下：
const add = (a, b, c) => a + b + c;
const a = currying(add, 1, 2);
console.log(a(3))


// 实现一个 add 方法，使计算结果能够满足如下预期：
// add(1)(2)(3)()=6
// add(1,2,3)(4)()=10
function add2(...args) {
  let allArgs = [...args];
  function fn(...newArgs) {
    // 前面传参数时，是不断的整合参数的过程，用于链式调用，直到最后才调用
    allArgs = [...allArgs, ...newArgs];
    return fn;
  }
  fn.toString = function () {
    if (!allArgs.length) {
      return;
    }
    return allArgs.reduce((sum, cur) => sum + cur);
  };
  return fn;
}
console.log(add2(1)(2)(3)() == 6)


function currying2 (fn, ...args) {
  const res = (...newArgs) => {
    const allArgs = [...args, ...newArgs]
    if (fn.length === allArgs.length) {
      return fn(...allArgs)
    } else {
      return res
    }
  }
  return res
}