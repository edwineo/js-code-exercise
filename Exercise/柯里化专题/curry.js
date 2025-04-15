// 柯里化（Currying）是将一个多参数函数转换成一系列单参数函数的技术。
// 实现一个 add 函数，支持两种调用方式：
// add(1)(2)(3) // 逐步传参
// add(1, 2, 3) // 一次性传参

// 传入一个函数，将这个函数进行柯里化
function curry (fn, ...args) {
  // 始终返回一个函数，方便直接传入 fn.length 时，后续也能执行
  const res = (...nextArgs) => {
    const allArgs = [...args, ...nextArgs]
    if (allArgs.length >= fn.length) {
      return fn(...allArgs)
    } else {
      return curry(fn, ...allArgs)
    }
  }
  return res
}

// 测试
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add, 1);
console.log(curriedAdd(3)(4))