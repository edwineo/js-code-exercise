// JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

class Scheduler {
  constructor () {
    this.work = [] // 正在执行
    this.unwork = [] // 队列中
    this.max = 2 // 最大数量
  }
  // 暴露给外部的方法
  add (promiseFactory) {
    return new Promise((resolve, reject) => {
      const task = () => promiseFactory().then(resolve).catch(reject)
      if (this.work.length >= this.max) {
        this.unwork.push(task)
      } else {
        this._run(task)
      }
    })
  }
  // 私有属性
  _run (promiseTask) {
    const promise = promiseTask()
    this.work.push(promise)

    // 执行这个异步任务
    // 在 finally 中添加后续并发任务的执行逻辑，因为不管成功与否都要执行后面的
    promise.finally(() => {
      // 将先前的任务去除
      this.work = this.work.filter(p => p !== promise)
      // 执行下一个任务
      if (this.unwork.length) {
        this._run(this.unwork.shift())
      }
    })
  }
}

// 示例
const scheduler = new Scheduler();

const timeout = (time, order) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(order)
      console.log(order)
    }, time)
  })
}

const addTask = (time, order) => {
  scheduler.add(() => timeout(time, order))
}
addTask(900, 1);
addTask(900, 1);
addTask(1000, 2);
addTask(3000, 3);
addTask(4000, 4);