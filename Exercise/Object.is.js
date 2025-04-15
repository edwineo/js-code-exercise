// NaN 在 === 中是不相等的，而在 Object.is 中是相等的
// +0 和 -0 在 === 中是相等的，而在 Object.is 中是不相等的

function objectIs (x, y) {
  if (x === y) {
    if (x !== 0) {
      return true
    }
    // 处理 +0 和 -0
    return 1 / x === 1 / y // Infinity 和 -Infinity
  }

  // 处理 NaN
  return x !== x && y !== y
}
