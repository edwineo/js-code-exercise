// 实现模版字符串解析能力

// let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
// let data = {
//   name: "姓名",
//   age: 18,
// };

// render(template, data); // 我是姓名，年龄18，性别undefined

function renderTemplate (template, data) {
  // 这个实现本质是将字符串路径通过 split('.') 拆分成访问层级数组
  // 然后利用 reduce 从对象根节点开始逐层访问属性，每一步都更新 accumulator，从而模拟了 obj.user.name 这种链式访问逻辑；
  // ?. 用于防止中间层为空导致报错
  function getValue (obj, path) {
    return path.split('.').reduce((acc, cur) => {
      return acc?.[cur]
    }, obj)
  }

  const computed = template.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
    return getValue(data, key) ?? ''
  })

  return computed
}

function renderTemplate2 (template, data) {
  const getValue = (data, key) => {
    return key.split('.').reduce((acc, cur) => {
      return acc?.[cur]
    }, data)
  }

  return template.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
    return getValue(data, key) ?? ''
  })
}

// (\w+) 只能匹配单层变量名，适用于简单模板替换。
// ([\w.]+) 通过允许 . 的存在，实现了简单的路径表达式支持。
// 这其实不是语法解析，而是用正则 + 字符串 split 模拟了一个“轻量级属性访问器”。它本质仍然是字符串处理，而不是语法解析。