// 实现一个对象的 flatten 方法

// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: {e: 5}
//   },
//   b: [1, 3, {a: 2, b: 3}],
//   c: 3
// }

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

// 递归与回溯
function flatten (obj) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }

  if (!isObject(obj)) {
    return
  }

  const res = {}
  function dfs (cur, prefix) {
    if (!isObject(cur)) {
      // 到叶子节点开始回溯
      res[prefix] = cur
      return
    }

    // 空数组情况，返回 []
    if (Array.isArray(cur) && !cur.length) {
      res[prefix] = []
      return
    }
    // 空对象情况，返回 {}
    if (!Array.isArray(cur) && !Object.keys(cur).length) {
      res[prefix] = {}
      return
    }

    if (Array.isArray(cur)) {
      cur.forEach((item, index) => {
        dfs(item, `${prefix}[${index}]`)
      })
    } else {
      for (let key in cur) {
        dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`)
      }
    }
  }

  dfs(obj, '')

  return res
}

function flatten2 (obj) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }

  if (!isObject(obj)) {
    return
  }

  const res = {}
  // prefix 是所有的前缀 key，这道题本质就是把前缀不断的拼接上。value 是值
  function dfs (prefix, value) {
    // 递归终点
    if (!isObject(value)) {
      res[prefix] = value
      return
    }
    // 兼容空数组、空对象情况
    if (Array.isArray(value) && !value.length) {
      res[prefix] = []
      return
    }
    if (!Array.isArray(value) && !Object.keys(value).length) {
      res[prefix] = {}
      return
    }

    // 正常有值的情况
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        dfs(`${prefix}[${index}]`, item)
      })
    } else {
      for (const key of Object.keys(value)) {
        dfs(`${prefix}${prefix ? '.' : ''}${key}`, value[key])
      }
    }
  }

  dfs('', obj)
  return res
}
