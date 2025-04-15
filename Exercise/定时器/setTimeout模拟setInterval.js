// setinterval 用来实现循环定时调用，可能会存在一定的问题，能用 setTimeout 解决吗

function mySetTimeout (fn, timeout) {
  let timer = null
  const interval = () => {
    // 执行回调
    fn()
    // 开启下一轮定时
    setTimeout(interval, timeout)
  }
  interval()

  // 清除定时器的方法
  return {
    clear: () => {
      clearTimeout(timer)
    }
  }
}
