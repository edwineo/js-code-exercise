function myCall (context, ...args) {
  // 这个 this 是调用 myCall 的 fn
  if (typeof this !== 'function') {
    console.error('error')
    return
  }

  // 没有调用方的话，默认指向于 window
  if (!context) {
    context === window
  }

  const key = Symbol()
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}

function myCall2 (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error("");
  }

  if (!context) {
    context = window
  }

  const key = Symbol()
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}

function myBind (context, ...args) {
  // 这个 this 是调用 myCall 的 fn
  if (typeof this !== 'function') {
    console.error('error')
    return
  }

  // 没有调用方的话，默认指向于 window
  if (!context) {
    context === window
  }

  const key = Symbol()
  context[key] = this
  
  // 特殊处理
  const cachedThis = this

  // 必须返回一个函数
  const res = function (...nextArgs) {
    if (this instanceof cachedThis) {
      // 若采用 new 函数使用的话，此时 this 是指向 res 实例的，不需要改变 this 指向
      context[key].call(this, ...args, ...nextArgs)
    } else {
      // 作为普通函数使用时，则改变 this
      context[key](...args, ...nextArgs)
    }
  }

  // 如果是第一种情况，那么需要继承构造函数原型属性和方法
  res.prototype = Object.create(_this.prototype)
  return res
}
