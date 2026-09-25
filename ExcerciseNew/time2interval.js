// setTimeout 模拟实现 setInterval

function mySetTimeout (fn, t) {
  let timer = null

  function interval () {
    fn()
    timer = setTimeout(interval, t);
  }

  interval()

  return {
    cancel: () => {
      clearTimeout(timer);
    }
  }
}

function mySetTimeout2 (fn, delay) {
  let timer = null

  const interval = () => {
    fn()
    timer = setTimeout(interval, delay)
  }
  interval()

  return {
    cancel: () => {
      return clearTimeout(timer)
    }
  }
}

// setInterval 实现 setTimeout
function myInterval (fn, t) {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, t)
}