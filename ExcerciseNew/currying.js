// 函数柯里化
function currying (fn, ...args) {
  const res = (...newArgs) => {
    const allArgs = [...args, ...newArgs];
    if (allArgs.length >= fn.length) {
      return fn(...allArgs)
    } else {
      return currying(fn, ...allArgs)
    }
  }

  return res
}

function currying2 (fn, ...args) {
  const res = (...newArgs) => {
    const allArgs = [...args, ...newArgs]
    if (allArgs >= fn.length) {
      return fn(...allArgs)
    } else {
      return currying2(fn, ...allArgs)
    }
  }
  return res
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = currying(add);
console.log(curriedAdd(1, 2)(3))


// 这里本质上已经不是 Curry，因为 Curry 有一个明确的结束条件：fn.length，天然知道要收集几个参数
// 实现一个 add 方法，使计算结果能够满足如下预期：add(1)(2)(3)()=6，add(1,2,3)(4)()=10
function add (...args) {
  // 计算当前参数的和
  let sum = args.reduce((pre, cur) => pre + cur, 0)

  // 返回一个新的函数用于继续接收参数
  function res (...newArgs) {
    if (!newArgs.length) {
      return sum
    }

    sum += newArgs.reduce((pre, cur) => pre + cur, 0)
    // 注意，当 newArgs.length 还有的时候，就一直还是 return res
    return res
  }

  return res
}

function add2 (...args) {
  let sum = args.reduce((acc, cur) => acc + cur, 0)

  function res (...newArgs) {
    if (!newArgs.length) {
      return sum
    }

    sum += newArgs.reduce((acc, cur) => acc + cur, 0)
    return res
  }

  return res
}

// 测试用例
console.log(add(1)(2)(3)()); // 输出 6
console.log(add(1, 2, 3)(4)()); // 输出 10
console.log(add(5)(10, 15)(20)()); // 输出 50
console.log(add(1, 1, 1)(1, 1)(1)()); // 输出 6