// 千分位格式化
// 千位分隔符

// 递归处理
function toLocaleString (num) {
  function dfs (str) {
    const len = str.length
    if (len <= 3) {
      return str
    } else {
      return `${dfs(str.slice(0, -3))},${str.slice(-3)}`
    }
  }

  // String(x)     → 更安全，任何值都能转字符串
  // x.toString()  → 调用对象自身方法，null/undefined 会报错
  const res = dfs(String(num))
  return res
}

// 递归是这个原理的最佳实现方式
function toLocaleString (num) {
  function dfs (str) {
    const len = str.length

    if (len <= 3) {
      return str
    } else {
      return `${dfs(str.slice(0, -3))},${str.slice(-3)}`
    }
  }

  return dfs(String(num))
}
