// 手写 stringify

// 简单版
// 1. 处理 null、undefined、基本类型、对象、数组。
// 2. 对日期对象返回 ISO 格式的字符串。
// 3. 对于对象，会递归地遍历每个属性。

function myStringify (value) {
  // 处理 null 和 undefined
  // 基本数据类型，返回字符串表示
  if (value === null || value === undefined || typeof value !== 'object') {
    return String(value)
  }

  // 处理日期对象
  if (value instanceof Date) {
    return `${value.toISOString()}`
  }

  // 递归处理数组
  if (Array.isArray(value)) {
    const res = value.map((item) => myStringify(item)).join(',')
    return `[${res}]`
  }

  // 递归处理对象
  const res = Object.keys(value).map(key => `${key}:${myStringify(value[key])}`).join(',')
  return `{${res}}`
}

// 测试用例
const obj = { name: 'Alice', age: 30, isActive: true, date: new Date() };
console.log(myStringify(obj));  // 输出一个类似于 JSON 的字符串
