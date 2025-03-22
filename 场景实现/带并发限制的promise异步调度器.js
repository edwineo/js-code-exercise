class Scheduler {
  constructor() {
    // this.date = null // 用于记录每个任务都是过了多久才执行打印出来的
    this.max = 2; // 最大限制数
    this.work = []; // 用来记录正在执行的任务盒子
    this.unwork = []; // 用来记录正在等待的任务盒子
  }
  add(promise) {
    if (this.work.length < this.max) {
      //还没达到最大数量限制，可以直接执行
      this.runTask(promise);
    } else {
     // 此时任务盒子数量达到并发最大数量，那就放在等待区域
      this.unwork.push(promise);
    }
  }
  runTask(promise) {
    // if (!this.date) {
    //   this.date = performance.now();
    // }
    this.work.push(promise); // 一定要添加进 work 数组，不然没法判断
    promise()
      .then(res => {
        console.log(res)
        // let now = performance.now();
        // let subdate = now - this.date;
        // subdate = (subdate / 100).toFixed(0) * 100; // 处理一下这个时间间隔，因为会多有几十毫秒，处理其他逻辑，例如 addTask 等
        // console.log('经过多久打印：', subdate, '打印值为：', res);
      })
      .finally(() => {
        // 任务执行完毕，就立马从执行任务盒子删掉
        let index = this.work.indexOf(promise);
        this.work.splice(index, 1);
        // 此时如果任务等待盒子还有异步任务，那就立即添加并执行
        if (this.unwork.length) {
          this.runTask(this.unwork.shift());
        }
      });
  }
}

const scheduler = new Scheduler();
const timeout = (time, order) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(order);
    }, time);
  });
};
const addTask = (time, order) => {
  scheduler.add(() => timeout(time, order));
};
addTask(4000, 1);
addTask(1000, 2);
addTask(900, 3);
addTask(3000, 4);