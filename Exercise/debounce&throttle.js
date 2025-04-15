// 利用闭包存储全局的 timer 或者 flag

function debounce (fn, timeout) {
  let timer = null
  // 一定是返回函数
  return function (...args) {
    const context = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, ...args)
    }, timeout);
  }
}

function throttle (fn, timeout) {
  let flag = true
  return function (...args) {
    if (!flag) {
      return
    }
    // 锁住，表示下一次不能再执行
    flag = false
    const context = this
    setTimeout(() => {
      fn.apply(context, ...args)
      flag = true
    }, timeout)
  }
}

