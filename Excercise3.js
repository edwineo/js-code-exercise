
// 21. 版本号排序
function versionSort (versionList) {
  versionList.sort((a, b) => {
    const aList = a.split('.')
    const bList = b.split('.')
    let i = 0
    while (true) {
      const cur1 = aList[i]
      const cur2 = bList[i]
      i++
      if (cur1 === undefined || cur2 === undefined) {
        return bList.length - aList.length
      }
      if (cur1 === cur2) {
        continue
      }
      return cur2 - cur1
    }
  })
  return versionList
}

// 22. LRU
class LRU {
  constructor () {
    
  }
}

// 23. Promise.all & Promise.race
function promiseAll (promiseList) {
  const len = promiseList.length
  const result = new Array(len)
  let count = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseList[i]).then((res) => {
        result[i] = res
        count++
        if (count === len) {
          resolve(result)
        }
      }, (err) => {
        reject(err)
      })
    }
  })
}
function promiseRace (promiseList) {
  const len = promiseList.length
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseList[i]).then((res) => {
        resolve(res)
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
  dom.childNodes.forEach((item) => { obj.children.push(dom2json(item)) })
  return obj
}

// 27. 类数组转数组
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
const ul = document.getElementById('container')
const once = 10
const total = 20000
function loop (curTotal, curIndex) {
  if (curTotal < 0) {
    return
  }
  const pageSize = Math.min(once, curTotal)
  window.requestAnimationFrame(() => {
    for (let i = 0; i < pageSize; i++) {
      const element = document.createElement('div')
      element.innerHTML = ''
      ul.appendChild(element)
    }
  })
  loop(curTotal - pageSize, curIndex + pageSize)
}
loop(total, 0)

// 31. 虚拟 DOM 转真实 DOm

// 32. 模版字符串解析
// let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
// let data = {
//   name: "姓名",
//   age: 18,
// };
function renderTemplate (template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key])
}
// renderTemplate(template, data); // 我是姓名，年龄18，性别undefined

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
    // 递归终点
    if (!isObject(obj)) {
      res[prefix] = obj
      return
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => dfs(item, `${prefix}[${index}]`))
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
  const len = list.length
  const memo = {}
  const treeList = []
  for (let i = 0; i < len; i++) {
    memo[list[i].id] = list[i]
  }
  for (let key in memo) {
    const cur = memo[key]
    if (Number(cur.parentId) !== 0) {
      const parent = memo[cur.parentId]
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
function treeToList (tree) {
  const res = []
  function dfs (tree) {
    treeList.forEach(item => {
      if (item.children) {
        dfs(item.children)
        delete item.children
      }
      res.push(item)
    })
  }
  dfs(tree)
  return res
}

// 36. 大数相加
function add (a, b) {
  const len1 = a.length
  const len2 = b.length
  let carry = 0
  let i = len1 - 1
  let j = len2 - 1
  let res = ''
  while (i >= 0 || j >= 0 || carry) {
    const x = i >= 0 ? Number(a[i]) : 0
    const y = j >= 0 ? Number(b[j]) : 0
    const sum = x + y + carry

    res = (sum % 10) + res
    carry = Math.floor(sum / 10)
  }
  return res
}
