// 实现一个发布订阅模式拥有 on emit once off 方法

class EventEmitter {
  constructor () {
    this.events = {};
  }

  on (type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback];
    } else {
      this.events[type].push(callback);
    }
  }

  off (type, callback) {
    if (!this.events[type]) {
      return;
    }
    this.events[type] = this.events[type].filter((item) => item !== callback );
  }

  once (type, callback) {
    function fn () {
      callback();
      this.off(type, fn);
    }
    this.on(type, fn);
  }

  emit (type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((item) => {
        item.call(this, ...args);
      })
    }
  }
}