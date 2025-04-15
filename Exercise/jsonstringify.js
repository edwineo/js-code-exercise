function myStringify (value) {
  // 处理 null 和 undefined
  if (value === null || value === undefined) {
    return String(value)
  }

  // 基本数据类型，返回字符串表示
  if (typeof value !== 'object') {
    return String(value)
  }

  // 处理日期对象
  if (value instanceof Date) {
    return `"${value.toISOString()}"`
  }

  // 递归处理数组
  if (Array.isArray(value)) {
    const res = value.map(item => myStringify(item)).join(',')
    return `[${res}]` // 返回数组
  }

  // 递归处理对象
  const keys = Object.keys(value)
  const res = keys.map(key => {
    const keyStr = `"${key}"`
    const valueStr = myStringify(value[key])
    return `${keyStr}:${valueStr}`
  }).join(',')

  return `{${res}}` // 返回对象
}

// 测试用例
const obj = { name: 'Alice', age: 30, isActive: true, date: new Date() };
console.log(myStringify(obj));  // 输出一个类似于 JSON 的字符串
