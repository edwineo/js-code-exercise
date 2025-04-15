// 实现一个 add 方法，使计算结果能够满足如下预期：
// add(1)(2)(3)()=6
// add(1,2,3)(4)()=10

function add (...args) {
  // 链式调用，一定要返回一个函数

  // 通过闭包将所有的计算结果先加起来
  let sum = args.reduce((acc, cur) => acc + cur, 0)

  const inner = (...nextArgs) => {
    if (!nextArgs.length) {
      return sum
    }
    sum = sum + nextArgs.reduce((acc, cur) => acc + cur, 0)
    return inner // 持续返回函数，拿到闭包保存的 sum
  }

  return inner
}

function add2 (...args) {
  const sum = args.reduce((acc, cur) => acc + cur, 0)
  const inner = (...nextArgs) => {
    if (!nextArgs.length) {
      return sum
    }
    sum += nextArgs.reduce((acc, cur) => acc + cur, 0)
    return inner
  }
  return inner
}

// 示例
console.log(add(1)(2)(3)()); // 输出 6
console.log(add(1, 2, 3)(4)()); // 输出 10
console.log(add(5)(10, 15)(20)()); // 输出 50
console.log(add(1, 1, 1)(1, 1)(1)()); // 输出 6