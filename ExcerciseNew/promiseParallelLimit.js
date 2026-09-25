// 实现有并行限制的 Promise 调度器，保证同时运行的任务最多有两个

class Scheduler {
  constructor(max = 2) {
    this.max = max
    this.runningCount = 0
    this.queue = []
  }

  add(promiseFactory) {
    // 一定要 return promise，因为调度器的任务本质上不能马上执行，所以 add() 必须返回一个 Promise，把最终结果再传给调用方。
    return new Promise((resolve, reject) => {
      // 防止抛出异常，例如
      // const promiseFactory = () => {
      //   throw new Error('boom')
      // }
      const task = () => Promise.resolve().then(promiseFactory).then(resolve, reject)
      if (this.runningCount < this.max) {
        this._run(task)
      } else {
        this.queue.push(task)
      }
    })
  }

  _run(task) {
    this.runningCount++
    task().finally(() => {
      this.runningCount--
      if (this.queue.length) {
        this._run(this.queue.shift())
      }
    })
  }
}

class Scheduler2 {
  constructor (max) {
    this.max = max
    this.runningCount = 0
    this.queue = []
  }

  add (promiseFactory) {
    return new Promise((resolve, reject) => {
      const task = Promise.resolve().then(promiseFactory).then(resolve, reject)
      if (this.runningCount < this.max) {
        this._run(task)
      } else {
        this.queue.push(task)
      }
    })
  }

  _run (task) {
    this.runningCount++
    task().finally(() => {
      this.runningCount--
      if (this.queue.length) {
        this._run(this.queue.shift())
      }
    })
  }
}

// 示例
const scheduler = new Scheduler();

const timeout = (time, order) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(order);
      console.log(order);
    }, time);
  });
};

const addTask = (time, order) => {
  scheduler.add(() => timeout(time, order));
};
addTask(900, 1);
addTask(900, 1);
addTask(1000, 2);
addTask(3000, 3);
addTask(4000, 4);
