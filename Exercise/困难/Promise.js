class MyPromise {
  // 构造方法
  constructor(executor) {
    // 初始化值
    this.initValue()
    // 初始化this指向
    // resolve 和 reject 需要绑定 this，这是因为它们的 this 需要永远指向当前的 Promise 实例
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    // 执行传进来的函数
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  initValue() {
    // 初始化值
    this.PromiseResult = null // 终值
    this.PromiseState = 'pending' // 状态
    this.onFulfilledCallbacks = [] // 保存成功的回调，为了能延时执行
    this.onRejectedCallbacks = [] // 保存失败的回调，为了能延时执行
  }

  resolve(value) {
    // 状态不可变
    if (this.PromiseState !== 'pending') return
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = 'fulfilled'
    // 终值为传进来的值
    this.PromiseResult = value
    // 执行成功的回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }

  reject(reason) {
    // 状态不可变
    if (this.PromiseState !== 'pending') return
    // 如果执行reject，状态变为rejected
    this.PromiseState = 'rejected'
    // 终值为传进来的reason
    this.PromiseResult = reason
    // 执行失败的回调
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }

  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected
    
    // 参数校验，确保一定是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        queueMicrotask(() => {
          try {
            const x = cb(this.PromiseResult)
            if (x === thenPromise) {
              // 不能返回自身
              throw new Error('不能返回自身')
            }
            if (x instanceof MyPromise) {
              // 如果返回值是Promise
              // 如果返回值是promise对象，返回值为成功，新promise就是成功
              // 如果返回值是promise对象，返回值为失败，新promise就是失败
              // 谁知道返回的promise是失败成功？只有then知道
              x.then(resolve, reject) // 在 then 中再判断 PromiseState 执行 resolve 或 reject
            } else {
              // 非Promise就直接成功
              resolve(x)
            }
          } catch (err) {
            // 处理报错
            reject(err)
            throw new Error(err)
          }
        })
      }

      if (this.PromiseState === 'fulfilled') {
        // 如果当前为成功状态，执行第一个回调
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        // 如果当前为失败状态，执行第二个回调
        resolvePromise(onRejected)
      } else if (this.PromiseState === 'pending') {
        // 如果当前为 peding 状态，则保存回调，resolve, reject 之后再执行
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    return thenPromise
  }
}

// 微任务
// const p = new MyPromise((resolve, reject) => {
//   resolve(1)
// }).then(res => console.log(res), err => console.log(err))

// console.log(2)

// thenable
// const p = new MyPromise((resolve, reject) => {
//   resolve({
//     then(res, rej) {
//       res('hello')
//     }
//   })
// })

// p.then(res => console.log(res))

// 值穿透
// const p = new MyPromise((resolve, reject) => {
//   resolve(0)
// })

// p.then(1).then((res) => {
//   console.log('res', res)
//   return 2
// }).catch((err) => {
//   console.log('err', err)
// })