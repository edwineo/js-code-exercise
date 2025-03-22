function myCall (context, ...args) {
  // 判断调用对象是否是函数，只有函数才能调用 call 方法（这里 this 是指向被调用的函数的）
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 如果没有 this，或者 this 等于 null，则指向全局
  if (!context) {
    context = window
  }
  // 创建一个 Symbol 作为 key，作为我们构造的 context 内部方法名，而 value 即为传入的 context 自身
  const fn = Symbol()
  // 将函数作为上下文对象的一个属性
  // 例如 Object.prototype.toString.call(context, ...args)
  // 以 context 为对象，以 Object.prototype.toString 为 context 上的一个方法，然后进行调用
  context[fn] = this
  // 执行函数并返回结果，相当于把自身作为传入 context 的 fn 方法进行调用了
  const result = context[fn](...args)
  // 调用完需要将临时的 fn 属性删除
  delete context.fn
  return result
}

function myApply (context, args) {
  // 判断调用对象是否是函数，只有函数才能调用 apply 方法
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 如果没有 this，或者 this 等于 null，则指向全局
  if (!context) {
    context = window
  }
  // 创建一个 Symbol 作为 key，作为我们构造的 context 内部方法名，而 value 即为传入的 context 自身
  const fn = Symbol()
  // 将函数作为上下文对象的一个属性
  // 例如 Object.prototype.toString.call(context, ...args)
  // 以 context 为对象，以 Object.prototype.toString 为 context 上的一个方法，然后进行调用
  context[fn] = this
  // 执行函数并返回结果，相当于把自身作为传入 context 的 fn 方法进行调用了
  const result = context[fn](...args)
  // 调用完需要将临时的 fn 属性删除
  delete context.fn
  return result
}

function myBind (context, ...args) {
  // 判断调用对象是否是函数，只有函数才能调用 bind 方法
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 如果没有 this，或者 this 等于 null，则指向全局
  if (!context) {
    context = window
  }
  // 创建一个 Symbol 作为 key，作为我们构造的 context 内部方法名，而 value 即为传入的 context 自身
  const fn = Symbol()
  // 将函数作为上下文对象的一个属性
  // 例如 Object.prototype.toString.call(context, ...args)
  // 以 context 为对象，以 Object.prototype.toString 为 context 上的一个方法，然后进行调用
  context[fn] = this
  const _this = this
  // 虽然情况复杂，但是了解清楚这两种情况后，代码就很简单了
  const result = function (...innerArgs) {
    // 第一种情况：
    // 若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的 result 对象
    // 此时由于 new 操作符作用，this 指向 result 实例对象  而 result 又继承自传入的 _this
    // 根据原型链知识可得出 this instanceof _this
    if (this instanceof _this) {
      // 此时 this 指向 result 的实例，这时候不需要改变 this 指向，所以执行 _this
      _this(...[...args, ...innerArgs]) // 使用 es6 的方法让 bind 支持参数合并
    } else {
      // 第二种情况：
      // 作为普通函数调用，则直接改变 this 指向为传入的 context
      context[fn](...[...args, ...innerArgs])
    }
  }

  // 如果是第一种情况，那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用 Object.create
  result.prototype = Object.create(_this.prototype) // 这里 _this 就是 this

  return result
}


function myCall2 (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  if (!context) {
    context = window
  }
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}
