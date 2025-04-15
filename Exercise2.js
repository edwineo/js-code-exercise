// 1. compose
function compose (...fn) {
  if (!fn.length) {
    return (res) => res
  }
  return fn.reduce((acc, cur) => (...args) => acc(cur(...args)))
}

// 2.1 setTimeout 模拟 setInterval
function myInterval (fn, delay) {
  let timer = null
  function interval () {
    fn()
    timer = setTimeout(interval, delay)
  }
  interval()
  return {
    clear: () => {
      clearTimeout(timer)
    }
  }
}

// 2.2 setInterval 模拟 setTimeout
function mySetTimeout (fn, delay) {
  let timer = null
  timer = setInterval(() => {
    fn()
    clearInterval(timer)
  })
}

// 3. 事件订阅

// 4. 数组去重
function uniqueArr (arr) {
  return [...new Set(arr)]
}

// 5.1 数组扁平化（递归）
function flattenArr (arr) {
  // 回溯
  if (!arr.length) {
    return
  }
  // 递归
  return arr.reduce((acc, cur) => Array.isArray(cur) ? [...acc, ...flattenArr(cur)] : [...acc, cur])
}

// 5.1 数组扁平化（迭代）
function flattenArr2 (arr) {
  if (!arr.length) {
    return
  }
  while (arr.some(i => Array.isArray(i))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 6. 寄生组合式继承

// 7. 并行限制的 promise
class Scheduler {
  constructor () {
    this.max = 2
    this.work = []
    this.unwork = []
  }

  add (promiseFactory) {
    return new Promise((resolve, reject) => {
      const promise = promiseFactory().then(resolve).catch(reject)
      if (this.work.length >= this.max) {
        this.unwork.push(promise)
      } else {
        this._run(promise)
      }
    })
  }

  _run (promiseTask) {
    const promise = promiseTask()
    this.work.push(promise)
    promise.finally(() => {
      this.work = this.work.filter(i => i !== promise)
      if (this.unwork.length) {
        this._run(this.unwork.shift())
      }
    })
  }
}

// 8. new 操作符
function myNew (fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('')
  }
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  if (res && (typeof res === 'function' || typeof res === 'object')) {
    return res
  }
  return obj
}

// 9. call bind
function myCall (context, ...args) {
  if (typeof this !== 'function') {
    return
  }
  const key = Symbol()
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}
function myBind (context, ...args) {
  if (typeof this !== 'function') {
    return
  }
  const _this = this
  return (...nextArgs) => {
    const key = Symbol()
    context[key] = _this
    const res = context[key](...args, ...nextArgs)
    delete context[key]
    return res
  }
}

// 10. 深拷贝
function deepClone (obj, memo = new WeakMap()) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }
  if (!isObject(obj)) {
    return obj
  }
  if (memo.has(obj)) {
    return memo.get(obj)
  }
  const newObj = Array.isArray(obj) ? [] : {}
  memo.set(obj, newObj)
  Reflect.ownKeys(obj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key], memo) : obj[key]
  })
  return newObj
}

// 11. instanceof
function myInstanceof (instance, cclass) {
  const proto = Object.getPrototypeOf(instance)
  while (true) {
    if (proto === null) {
      return false
    }
    if (proto === cclass.prototype) {
      return true
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
      return currying(fn, ...allArgs)
    }
  }
}

// 19. LazyMan
class LazyMan {
  constructor (name) {
    this.tasks = [() => {
      console.log(`Hi this is ${name}`)
      this.next()
    }]
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next () {
    const task = this.tasks.shift()
    task && task()
  }
  sleep (delay) {
    this.handleSleep(delay, false)
    return this
  }
  sleepFirst (delay) {
    this.handleSleep(delay, true)
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
  run () {
    const task = () => {
      console.log('somebody is running')
      this.next()
    }
    this.tasks.push(task)
    return this
  }
}

// 20. debounce & throttle
function myDebounce (fn, delay) {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    const _this = this
    timer = setTimeout(() => {
      fn.call(_this, ...args)
    }, delay)
  }
}
function myThrottle (fn, delay) {
  let flag = true
  return (...args) => {
    if (!flag) {
      return
    }
    flag = false
    const _this = this
    setTimeout(() => {
      fn.call(_this, ...args)
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
      const x = arr1[i]
      const y = arr2[i]
      i++
      if (x === undefined || y === undefined) {
        return arr2.length - arr1.length
      }
      if (x === y) {
        continue
      }
      return y - x
    }
  })
  return versionList
}

// 22. LRU
class LRU {
  constructor (capacity) {
    this.secretKey = new Map()
    this.capacity = capacity
  }
  get (key) {
    if (this.secretKey.has(key)) {
      const value = this.secretKey.get(key)
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
      return value
    } else {
      return -1
    }
  }
  put (key, value) {
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
    } else if (this.secretKey.size < this.capacity) {
      this.secretKey.set(key, value)
    } else {
      this.secretKey.set(key, value)
      this.secretKey.delete(this.secretKey.keys().next().value)
    }
  }
}

// 23. Promise.all & Promise.race
function myPromiseAll (promiseList) {
  const result = []
  let count = 0
  const len = promiseList.length
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseList[i]).then((res) => {
        count++
        result.push(res)
        if (count >= len) {
          resolve(result)
        }
      }, (err) => {
        reject(err)
      })
    }
  })
}
function myPromiseRace (promiseList) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseList.length; i++) {
      Promise.resolve(promiseList[i]).then((res) => {
        resolve(result)
      }, (err) => {
        reject(err)
      })
    }
  })
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

// 25. 硬币找零

// 26. DOM 转 JSON
function dom2json (dom) {
  const obj = {}
  obj.tag = dom.tagName
  obj.children = []
  dom.childNodes.forEach(child => { obj.children.push(dom2json(child)) })
  return obj
}

// 27. 类数组转换成数组
// const arrayLike = document.querySelectorAll('div')
// Array.from(arrayLike)
// [...arrayLike]
// Array.prototype.slice.call(arrayLike)

// 28. Object.is
function myObjectIs (x, y) {
  if (x === y) {
    return x !== 0 || x / 1 === y / 1
  }
  return x !== x && y !== y
}

// 29. AJAX

// 30. 时间切片
const ul = document.getElementById('container')
const total = 10000
const once = 20
function loop (curTotal, curIndex) {
  if (curTotal < 0) {
    return
  }
  const pageSize = Math.min(once, curTotal)
  window.requestAnimationFrame(() => {
    for (let i = 0; i < pageSize; i++) {
      const element = document.createElement('div')
      ul.appendChild(element)
    }
    loop(curTotal - pageSize, curIndex + pageSize)
  })
}
loop(total, 0)

// 31. 虚拟 DOM 转换成真实 DOM

// 32. 模版字符串解析
let template = "我是{{name}}，年龄{{age}}，性别{{sex}}"
let data = {
  name: "姓名",
  age: 18,
}
function templateRender (template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key]
  })
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
    return typeof obj === 'object' && obj !== null
  }
  const res = {}
  function dfs (obj, prefix) {
    // 回溯
    if (!isObject(obj)) {
      res[prefix] = obj
      return
    }
    // 递归
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        // 每个 item 最后都会到 res[prefix] = obj 挂在对象上
        dfs(obj, `${prefix}[${index}]`)
      })
    } else {
      for (let key in obj) {
        dfs(obj, `${prefix}${prefix ? '.' : ''}${key}`)
      }
    }
  }
  dfs(obj, '')
  return res
}

// 34. 列表转树结构
function listToTree (list) {
  const treeList = []
  const len = list.length
  const map = {}
  for (let i = 0; i < len; i++) {
    const cur = list[i]
    map[cur.id] = cur
  }
  
  for (let key in map) {
    const cur = map[key]
    if (Number(cur.parentId) !== 0) {
      const parent = map[cur.parentId]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(cur)
    } else {
      treeList.push(cur)
    }
  }

  return treeList
}

// 35. 树形结构转数组
function treeToList (treeList) {
  const res = []
  function dfs (treeList) {
    treeList.forEach((item) => {
      if (item.children) {
        dfs(item.children)
        delete item.children
      }
      res.push(item)
    })
  }
  dfs(treeList)
  return res
}

// 36. 大数相加
function add (a, b) {
  let res = ''
  let carry = 0
  const i = a.length - 1
  const j = b.length - 1
  
  while (i >= 0 || j >= 0 || carry) {
    const x = i >= 0 ? a[i] : 0
    const y = j >= 0 ? b[j] : 0
    const sum = x + y + carry
    res = `${sum % 10}${res}`
    carry = Math.floor(sum / 10)
  }

  return res
}

// 37. 排序算法
function bubbleSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    // i 只是充当最后一个元素的占位
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
function selectSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}
function insertSort (arr) {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    const cur = arr[i]
    let j = i - 1
    while (j >= 0 && cur < nums[j]) {
      nums[j + 1] = nums[j]
      j--
    }
    nums[j + 1] = cur
  }
  return arr
}
