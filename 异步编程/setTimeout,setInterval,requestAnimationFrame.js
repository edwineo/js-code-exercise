// setTimeout 实现 setInterval
function myInterval (func, delay) {
  // 声明 timer，用于后面清除定时器
  let timer = null
  const interval = () => {
    // 执行对应传入函数
    func()
    // 用 timer 接收 setTimeout 返回的定时器编号
    timer = setTimeout(interval, delay)
  }
  // 第一次调用 setTimeout，等待 delay 结束后，执行 func 并且再次执行 setTimeout
  setTimeout(interval, delay)
  //返回一个 cancel 方法用于清除定时器
  return {
    cancel: () => {
      clearTimeout(timer) // 清除 timer 编号的定时器
    }
  }
}

// 测试
//传进一个 console.log 的函数，解构出 cancel 方法
const { cancel } = myInterval(() => console.log(888), 1000)
// 清除定时器
setTimeout(()=>{
  cancel()
}, 4000)

// requestAnimationFrame 实现 setInterval
function myInterval2 (func, delay) {
  let timer
  let start, end
  start = end = Date.now()
  function loop () {
    // 每隔 16ms 浏览器重绘一次，并执行一次 loop
    // loop 中检查如果时间到了 interval 的时间，则执行 func
    // timer 用于随时取消 requestAnimationFrame
    timer = window.requestAnimationFrame(loop)
    end = Date.now()
    if (end - start >= delay) {
      start = end = Date.now()
      func(timer)
    }
  }
  // 初始时执行一次
  timer = window.requestAnimationFrame(loop)
  // return timer 来让使用者可以随时取消
  return timer
}

let a = 0
myInterval2(timer => {
  console.log(1)
  a++
  if (a === 3) {
    // 取消 requestAnimationFrame
    cancelAnimationFrame(timer)
  }
}, 1000)


function setTimeout2Interval (fn, delay) {
  let timer
  function loop () {
    fn()
    timer = setTimeout(loop, delay)
  }
  setTimeout(loop, delay)
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}

function requestAnimationFrame2Interval (fn, delay) {
  let timer
  let start, end
  start = end = Date.now()
  function loop () {
    timer = window.requestAnimationFrame(loop)
    end = Date.now()
    if (end - start >= delay) {
      fn()
      start = end = Date.now()
    }
  }
  window.requestAnimationFrame(loop)
  return timer
}