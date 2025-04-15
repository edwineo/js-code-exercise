// 1. compose
function compose(fn) {
  if (!fn) {
    return (res) => res;
  }
  return fn.reduce((acc, cur) =>
      (...args) =>
        acc(cur(...args))
  );
}

// 2.1 setTimeout 模拟 setInterval
function mySetInterval(fn, delay) {
  let timer = null;
  function interval() {
    fn();
    timer = setTimeout(() => {
      interval();
    }, delay);
  }
  interval();
  return {
    clear: () => {
      clearTimeout(timer);
    },
  };
}

// 2.2 setInterval 模拟 setTimeout
function mySetTimeout(fn, delay) {
  let timer = setInterval(() => {
    fn();
    clearInterval(timer);
  }, delay);
}

// 3. 发布订阅
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, callback) {
    if (this.events[type]) {
      this.events[type].push(callback);
    } else {
      this.events[type] = [callback];
    }
  }

  off(type, callback) {
    if (!this.events[type]) {
      return;
    }
    this.events[type] = this.events[type].filter((i) => i !== callback);
  }

  once(type, callback) {
    const onceFn = () => {
      callback();
      this.off(type, callback);
    };
    this.on(type, onceFn);
  }

  emit(type, ...rest) {
    if (this.events[type]) {
      this.events[type].forEach((item) => {
        item.call(this, ...rest);
      });
    }
  }
}

// 4. 数组去重
function uniqueArr(arr) {
  return [...new Set(arr)];
}

// 5.1 数组扁平化（递归）
function flattenArr(arr) {
  if (!arr.length) {
    return;
  }
  return arr.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flattenArr(cur)] : [...acc, cur],
    []
  );
}

// 5.1 数组扁平化（迭代）
function flattenArr(arr) {
  if (!arr.length) {
    return;
  }
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// 6. 寄生组合继承
function Parent(name) {
  this.name = name;
}

function Children(name) {
  Parent.call(this);
}
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;

// 7. 并行限制的 promise
class Scheduler {
  constructor() {
    this.work = []; // 正在执行
    this.unwork = []; // 队列中
    this.max = 2; // 最大数量
  }
  add(promiseFactory) {
    return new Promise((resolve, reject) => {
      const task = promiseFactory().then(resolve).catch(reject);
      if (this.work.length >= this.max) {
        this.unwork.push(task);
      } else {
        this._run(task);
      }
    });
  }
  _run(promiseTask) {
    const promise = promiseTask();
    this.work.push(promise);
    promise.finally(() => {
      this.work = this.work.filter((item) => item !== promise);
      if (this.unwork.length) {
        this._run(this.unwork.shift());
      }
    });
  }
}

// 8. new 操作符
function myNew(fn, ...args) {
  if (typeof fn !== "function") {
    throw new Error("");
  }
  const obj = Object.create(fn.prototype);
  const res = fn.call(obj, ...args);
  if (res && (typeof res === "function" || typeof res === "object")) {
    return res;
  }
  return obj;
}

// 9.1 call bind
function myCall(context, ...args) {
  if (typeof this !== "function") {
    throw new Error("");
  }
  const key = Symbol();
  context[key] = this;
  const res = context[key](...args);
  delete context[key];
  return res;
}
function bind(context, ...args) {
  if (typeof this !== "function") {
    throw new Error("");
  }
  const _this = this
  return (...nextArgs) => {
    const key = Symbol();
    context[key] = _this;
    const res = context[key](...args, ...nextArgs);
    delete context[key];
    return res;
  };
}

// 10. 深拷贝
function deepClone (obj, memo = new WeakMap()) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }
  if (!isObject(obj)) {
    return obj
  }
  // 判断缓存
  if (memo.has(obj)) {
    return memo.get(obj)
  }
  // 开始深拷贝
  const newObj = Array.isArray(obj) ? [] : {}
  memo.set(obj, newObj)
  Reflect.ownKeys(obj).forEach(key => {
    if (isObject(obj[key])) {
      newObj[key] = deepClone(obj[key], memo)
    } else {
      newObj[key] = obj[key]
    }
  })

  return newObj
}
function shallowCopy (obj) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }

  if (!isObject(obj)) {
    return obj
  }
  return Object.assign({}, obj)
}

// 11. instanceof
function myInstanceof (instance, cclass) {
  let proto = Object.getPrototypeOf(instance)

  while (true) {
    if (proto === cclass.prototype) {
      return true
    }
    if (proto === null) {
      return false
    }
    proto = Object.getPrototypeOf(proto)
  }
}

// 12. curry
function currying (fn, ...args) {
  return (...nextArgs) => {
    const allArgs = [...args, ...nextArgs]
    if (allArgs.length >= fn.length) {
      return fn(...allArgs)
    } else {
      return curry(fn, ...allArgs)
    }
  }
}
// 用法如下：
const add = (a, b, c) => a + b + c;
const a = currying(add, 1, 2);
console.log(a(3))

// 19. LazyMan
class _LazyMan {
  constructor (name) {
    this.tasks = [() => {
      console.log(`initial task ${name}`)
      this.next()
    }]
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next () {
    const task = this.tasks.shift()
    task()
  }
  _run () {
    const task = () => {
      console.log('somebody is running')
      this.next()
    }
    this.tasks.push(task)
    return this
  }
  sleep (delay, isFirst) {
    handleSleep(delay, false)
    return this
  }
  sleep (delay, isFirst) {
    handleSleep(delay, true)
    return this
  }
  handleSleep (delay, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log('sleep')
        this.next()
      }, delay)
    }
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
}

// 20 debounce & throttle
function debounce (fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(() => {
      fn.call(context, ...args)
    }, delay)
  }
}
function throttle (fn, delay) {
  let flag = true
  return function (...args) {
    if (!flag) {
      return
    }
    flag = false
    const context = this
    setTimeout(() => {
      fn.call(context, ...args)
      flag = true
    }, delay)
  }
}

// 21. 版本号排序
function versionSort (versionList) {
  versionList.sort((a, b) => {
    const arr1 = a.split('.')
    const arr2 = b.split('.')
    let i = 0
    while (true) {
      const cur1 = arr1[i]
      const cur2 = arr2[i]
      i++
      // 其中一个已经到底了，那么版本号长的那个肯定是更大的
      if (cur1 === undefined || cur2 === undefined) {
        return arr2.length - arr1.length
      }
      if (cur1 === cur2) {
        continue
      }
      return cur2 - cur1
    }
  })
}

// 22. LRU
class LRU {
  constructor (capacity) {
    this.capacity = capacity
    this.secretKey = new Map()
  }
  get (key) {

  }
  put (key, value) {

  }
}

// 23. Promise.all & Promise.race
function promiseAll (promiseList) {
  const result = []
  const len = promiseList.length
  let count = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseList[i]).then((res) => {
        result[i] = res
        count++
        if (count === promiseList.length) {
          resolve(result)
        }
      }, (err) => {
        reject(err)
      })
    }
  })
}
function promiseRace () {

}

// 24. add 方法
function add (...args) {
  const sum = args.reduce((acc, cur) => acc + cur, 0)
  const inner = (...nextArgs) => {
    if (!nextArgs.length) {
      return sum
    }
    sum += nextArgs.reduce((acc, cur) => acc + cur, 0)
    return inner
  }
  return inner
}

// 25 硬币找零

// 26. DOM 转 json
function dom2json (dom) {
  const obj = {}
  obj.tag = dom.tagName
  obj.children = []
  dom.childNodes.forEach((node) => { obj.children.push(dom2json(node)) })
  return obj
}

// 27. 类数组转化成数组
// const arrayLike = document.querySelectorAll('div')
// [...arrayLike]
// Array.from(arrayLike)
// Array.prototype.slice.call(arrayLike)

// 28. Object.is
function objectIs (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y
  }
  return x !== x && y !== y
}

// 29. AJAX

// 30. 时间切片
let ul = document.getElementById('container')
const total = 10000
const once = 20

function loop (curTotal, curIndex) {
  if (curTotal < 0) {
    return
  }
  const count = Math.min(once, curTotal)
  window.requestAnimationFrame(() => {
    for (let i = 0; i < count; i++) {
      const element = document.createElement('div')
      ul.append(element)
    }
    loop(curTotal - count, curIndex + count)
  })
}
loop(total, 0)

// 31. 虚拟 DOM 转换成真实 DOM
function _render (vnode) {

}

// 32. 模版字符串解析
// let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
// let data = {
//   name: "姓名",
//   age: 18,
// };

// render(template, data); // 我是姓名，年龄18，性别undefined
function textFind (template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key])
}

// 33. 对象的 flatten
// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: {e: 5}
//   },
//   b: [1, 3, {a: 2, b: 3}],
//   c: 3
// }

// flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
function flattenObj (obj) {
  const isObject = (obj) => {
    return typeof obj === "object" && obj !== null;
  }
  if (!isObject(obj)) {
    return
  }

  const res = {}
  function dfs (obj, prefix) {
    // 递归终点
    if (!isObject(obj)) {
      res[prefix] = obj
      return
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        dfs(item, `${prefix}[${index}]`)
      })
    } else {
      for (let key in obj) {
        dfs(obj[key], `${prefix}${prefix ? '.' : ''}${key}`)
      }
    }
  }
  dfs(obj, '')
  return res
}

// 34. 列表转树结构
function listToTree (list) {
  const res = []
  const map = {}
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    map[item.id] = item
  }

  for (let i in map) {
    const item = map[i]
    if (Number(item.parentId) !== 0) {
      const parent = map[item.parentId]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    } else {
      res.push(item)
    }
  }

  return res
}

// 35. 树形结构转数组
function treeToList (data) {
  const res = []

  function dfs (tree) {
    tree.forEach(item => {
      if (item.children) {
        dfs(item.children)
        delete item.children
      }
      res.push(item)
    })
  }

  dfs(data)
  return res
}

// 36. 大数相加
function add (x, y) {
  let res = ''
  let carry = 0

  let i = x.length - 1
  let j = y.length - 1

  while (i >= 0 || j >= 0 || carry) {
    const a = i >= 0 ? Number(x[i]) : 0
    const b = j >= 0 ? Number(y[j]) : 0
    const sum = a + b + carry

    res = (sum % 10) + res
    carry = Math.floor(sum / 10)
  }

  return res
}
