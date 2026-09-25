// 1. compose
function compose (...fn) {
  if (!fn.length) {
    return (res) => res
  }
  return fn.reduce((acc, cur) => (...args) => acc(cur(...args)))
}

// 2.1 setTimeout 模拟 setInterval
function mySetInterval (fn, delay) {
  let timer = null
  const interval = () => {
    fn()
    timer = setTimeout(interval, delay)
  }
  interval()
  return {
    clear: () => {
      clearTimeout(timer)
    }
  }
}
// 2.2 setInterval 模拟 setTimeout
function mySetTimeout (fn, delay) {
  const timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, delay)
}

// 3. 发布订阅
class EventEmitter {
  
}

// 4. 数组去重
function uniqueArr (arr) {
  return [...new Set(arr)]
}

// 5.1 数组扁平化（递归）
function flattenArr (arr) {
  if (!arr.length) {
    return
  }
  return arr.reduce((acc, cur) => Array.isArray(cur) ? [...acc, ...flattenArr(cur)] : [...acc, cur])
}
// 5.2 数组扁平化（迭代）
function flattenArr (arr) {
  if (!arr.length) {
    return
  }
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 6. 寄生组合继承
function Parent (name) {
  this.name = name
}
function Children (age) {
  Parent.call(this)
}
Children.prototype = Object.create(Parent.prototype)
Children.constructor = Children

// 7. 并行限制的 promise
class Scheduler {
  constructor () {
    this.work = []
    this.unwork = []
    this.max = 2
  }
  add (promiseFactory) {
    return new Promise((resolve, reject) => {
      const task = promiseFactory().then(resolve).catch(reject)
      if (this.work.length >= this.max) {
        this.unwork.push(task)
      } else {
        this._run(task)
      }
    })
  }
  _run (promiseTask) {
    const promise = promiseTask()
    this.work.push(promise)
    promise.finally(() => {
      this.work = this.work.filter(item => item !== promise)
      if (this.unwork.length) {
        const task = this.unwork.shift()
        this._run(task)
      }
    })
  }
}

// 8. New 操作符
function myNew (fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('')
  }
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

// 9.1 call & bind
function myCall (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('')
  }
  const key = Symbol()
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}
function myBind (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('')
  }
  const _this = this
  return (...nextArgs) => {
    const key = Symbol()
    context[key] = _this
    const res = context[key](...args, ...nextArgs)
    delete context[key]
    return res
  }
}

// 10. 深拷贝
function deepClone (obj, memo = new WeakMap()) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }

  if (!isObject(obj)) {
    return obj
  }

  if (memo.has(obj)) {
    memo.get(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.resource, obj.flags)
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof Node) {
    return obj.cloneNode(true)
  }

  const newObj = Array.isArray(obj) ? [] : {}
  memo.set(obj, newObj)
  Reflect.ownKeys(obj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key], memo) : obj[key]
  })

  return newObj
}
function shallowCopy (obj) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }
  if (!isObject(obj)) {
    return obj
  }
  return Object.assign({}, obj)
}

// 19. LazyMan
class LazyMan {
  constructor () {
    this.tasks = [() => {
      console.log('init')
      this.next()
    }]
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next () {
    const task = this.tasks.shift()
    task && task()
  }
  sleep (delay) {
    handleSleep(delay, false)
    return this
  }
  sleepFirst (delay) {
    handleSleep(delay, true)
    return this
  }
  handleSleep (delay, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log('sleep')
        this.next()
      }, delay)
    }
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
  run () {
    const task = () => {
      console.log('run')
      this.next()
    }
    this.tasks.push(task)
    return this
  }
}
