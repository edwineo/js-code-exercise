// 手写 New 操作符实现

function myNew (fn, ...args) {
  if (typeof fn !== 'function') {
    console.error('type error')
    return
  }

  let obj = Object.create(fn.prototype)
  let res = fn.call(obj, ...args)

  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

function myNew2 (fn, ...args) {
  if (typeof fn !== 'function') {
    console.error('type error')
    return
  }
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)

  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}
