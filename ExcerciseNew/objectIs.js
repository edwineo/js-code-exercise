// 实现 Object.is
// Object.is 不会转换被比较的两个值的类型，这点和 === 更为相似，他们之间也存在一些区别。
// NaN 在 === 中是不相等的，而在 Object.is 中是相等的
// +0 和 -0 在 === 中是相等的，而在 Object.is 中是不相等的

function objectIs (x, y) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
}

function objectIs2 (x, y) {
  if (x === y) {
    return x !== 0 || (1 / x === 1 / y)
  }
  return x !== x && y !== y
}
