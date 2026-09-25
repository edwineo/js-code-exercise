// 手写 call apply bind 实现

function myCall (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }

  if (!context) {
    context = window
  }

  const fn = symbol()
  context[fn] = this

  const result = context[fn](...args)

  delete context[fn]
  return result
}

function myApply (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }

  if (!context) {
    context = window
  }

  const fn = symbol()
  context[fn] = this

  const result = context[fn](args)

  delete context[fn]
  return result
}

function myBind (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }

  if (!context) {
    context = window
  }

  const fn = symbol()
  context[fn] = this

  const _this = this
  const result = function (...innerArgs) {
    if (this instanceof _this) {
      // 作为构造函数使用
      _this(...[...args, ...innerArgs])
    } else {
      // 作为普通函数使用
      context[fn](...[...args, ...innerArgs])
    }
  }

  result.prototype = Object.create(_this.prototype)

  return result
}