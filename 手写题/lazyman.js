class _LazyMan {
  constructor (name) {
    this.tasks = [] // 事件调用栈
    const task = () => { // 一定要是箭头函数 this 才能与 _LazyMan 保持一致，不然的话是全局
      console.log(`hi, this is ${name}`)
      this.next()
    }
    this.tasks.push(task)
    // 初始时，等链式调用的其他同步步骤执行完之后再开始执行函数
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next () {
    const task = this.tasks.shift()
    task && task()
  }
  sleep (time) {
    this.sleepWrapper(time, false)
    return this // 用于链式调用
  }
  sleepFirst (time) {
    this.sleepWrapper(time, true)
    return this // 用于链式调用
  }
  sleepWrapper (time, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log(`sleep ${time}s`)
        this.next()
      }, time * 1000)
    }
    // 是否先 sleep，只需要将其加入 tasks 的队首或队尾即可
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
  run () {
    const task = () => {
      console.log('somebody is running')
      this.next()
    }
    this.tasks.push(task)
    return this
  }
}

function lazyMan (name) {
  return new _LazyMan(name)
}

// 先全部 push 进去，再开始执行
lazyMan('Edwin').run().sleepFirst(3)
