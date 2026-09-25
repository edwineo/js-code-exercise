// debounce
// 闭包形式存储全局 timer
function debounce (fn, delay) {
  let timer = null

  return function (...args) {
    const context = this
    if (timer) {
      clearTimeout(timer)
    }
    // 每次都新建一个定时器
    timer = setTimeout(() => {
      fn.call(context, ...args)
    }, delay)
  }
}

function debounce2 (fn, delay) {
  let timer = null
  return (...args) => {
    const context = this
    // 每次都必须 clear
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(context, ...args)
    }, delay)
  }
}

// throttle
// flag 代表是否可以执行
function throttle (fn, delay) {
  let flag = true

  return function (...args) {
    if (!flag) {
      return
    }
    const context = this
    flag = false
    setTimeout(() => {
      fn.call(context, ...args)
      flag = true
    }, delay)
  }
}

function throttle (fn, delay) {
  let flag = true

  return (...args) => {
    // 当前还在 delay 中，不能执行
    if (!flag) {
      return
    }
    // 标记执行的状态
    flag = false
    const context = this
    setTimeout(() => {
      fn.call(context, ...args)
      flag = true
    }, delay)
  }
}

// debounceThrottle
// 防抖与节流结合。在 delay 时间内，我可以为你重新生成定时器；但只要 delay 的时间到了，我必须要给用户一个响应。相当于加个时间限制
function debounceThrottle (fn, delay) {
  let timer = null
  let last = 0

  return function (...args) {
    const context = this
    let now = Date.now()
    if (timer) {
      clearTimeout(timer)
    }

    // 时间到了一定要执行一次
    const remain = delay - (now - last)
    if (remain <= 0) {
      fn.call(context, ...args)
      last = Date.now()
    } else {
      timer = setTimeout(() => {
        fn.call(context, ...args)
      }, remain)
    }
  }
}