// debounce 防抖
function debounce(fn, delay) {
  // 闭包形式存储全局 timer
  let timer = null;
  return function () {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    // 每次都新建一个定时器
    timer = setTimeout(() => {
      // 使用 context，防止 setTimeout 中箭头函数的 this 指向全局
      fn.apply(context, arguments); // 改变 this 指向为调用 debounce 所指的对象
    }, delay)
  }
}

// throttle 节流
function throttle(fn, delay) {
  // flag 代表是否可以执行
  let flag = true
  return function () {
    if (!flag) {
      // 不执行
      return
    }
    // 每次执行时，都新建一个定时器，并且将 flag = false，表示定时器触发之前，不会再经过这里
    flag = false
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 改变 this 指向为调用 throttle 所指的对象
      flag = true
    }, delay)
  }
}

// 防抖与节流结合
// 在 delay 时间内，我可以为你重新生成定时器；但只要 delay 的时间到了，我必须要给用户一个响应。
function debounceThrottle(fn, delay) {
  // 闭包形式存储全局 timer
  let timer = null;
  let last = 0 // 代表上次执行的时间
  return function () {
    let now = Date.now();
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    // 时间到了 delay，则一定触发一次
    if (now - last >= delay) {
      fn.apply(context, arguments)
      last = Date.now() // 更新执行的时间
    } else {
      // 若未到 delay 时间，则每次都新建一个定时器
      timer = setTimeout(() => {
        // 使用 context，防止 setTimeout 中箭头函数的 this 指向全局
        fn.apply(context, arguments); // 改变 this 指向为调用 debounce 所指的对象
        // last = Date.now() // 更新执行的时间
      }, delay)
    }
  }
}

function debounce2 (fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(() => {
      fn.call(context, ...args)
    }, delay)
  }
}

function throttle2 (fn, delay) {
  let timer
  let flag = false
  return function (...args) {
    this.a = 1
    if (!flag) {
      flag = true
      timer = setTimeout(() => { // 箭头函数会继承上一级的 this，优先级比 setTimeout 的全局 this 高
        fn.call(this, ...args)
        flag = false
      }, delay)
    }
  }
}
const thro = throttle2(() => {}, 1000)
thro(11)