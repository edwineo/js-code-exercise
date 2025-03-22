Object.is = function (x, y) {
  if (x === y) {
    if (x !== 0) {
      // 普通情况
      return true
    } else {
      // +0 与 -0 情况
      return 1 / x === 1 / y
    }
  }
  // NaN 情况
  return x !== x && y !== y
}
