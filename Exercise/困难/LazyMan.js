class _LazyMan {
  constructor(name) {
    // 任务队列
    this.tasks = [];
    // 这只是一个初始任务
    const task = () => {
      console.log(`Hi this is ${name}`);
      this.next();
    };
    this.tasks.push(task);

    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    if (this.tasks.length) {
      const task = this.tasks.shift();
      task();
    }
  }

  sleep(time) {
    this.handleSleep(time, false);
    return this; // 链式调用
  }

  sleepFirst(time) {
    this.handleSleep(time, true);
    return this;
  }

  handleSleep(time, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log("sleep");
        this.next();
      }, time);
    };
    if (isFirst) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }

  add(fn) {
    const task = () => {
      setTimeout(() => {
        console.log("task");
        fn()
        this.next();
      }, 0);
    };
    this.tasks.push(task);
    return this
  }
}

function lazyMan(name) {
  return new _LazyMan(name);
}

// 先全部 push 进去，再开始执行
lazyMan("Edwin").add(() => {}).sleep(3000);
