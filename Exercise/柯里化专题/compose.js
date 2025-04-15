// 实现一个 compose 函数

function compose (...fn) {
  // 如果没有传入 fn，那么返回一个值传递的函数
  if (!fn.length) {
    return (res) => res
  }
  // 如果传入了 fn，那么就迭代的将所有 fn 执行
  return fn.reduce((acc, cur) => (...args) => acc(cur(...args)))
}

function compose2 (...fn) {
  if (!fn) {
    return (res) => res
  }
  return fn.reduce((acc, cur) => (...args) => acc(cur(...args)))
}

// 示例
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}

const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+(1+4+3+2)=11