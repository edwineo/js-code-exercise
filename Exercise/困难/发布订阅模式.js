class EventEmitter {
  constructor () {
    this.events = {}
  }

  // 订阅
  on (type, callback) {
    if (this.events[type]) {
      this.events[type].push(callback)
    } else {
      this.events[type] = [callback]
    }
  }

  // 取消订阅
  off (type, callback) {
    if (!this.events[type]) {
      return
    }
    this.events[type] = this.events[type].filter(i => i !== callback)
  }

  // 只执行一次订阅事件
  once (type, callback) {
    const onceFn = () => {
      callback()
      this.off(type, fn)
    }
    this.on(type, onceFn)
  }

  // 触发事件
  emit (type, ...args) {
    if (!this.events[type]) {
      return
    }
    this.events[type].forEach(callback => {
      callback.call(this, ...args)
    })
  }
}