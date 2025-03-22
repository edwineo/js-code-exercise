// 检测叠词的数量
// 栈方法
function check (s) {
  const stack = []
  const len = s.length
  let res = 0
  for (let i = 0; i < len; i++) {
    if (stack.length && stack[stack.length - 1] !== s[i]) {
      let count = 0
      while (stack.length && stack[stack.length - 1] !== s[i]) {
        stack.pop()
        count++
      }
      if (count > 1) {
        res++
      }
    }
    stack.push(s[i])
  }
  return res
}
console.log(check('aaabbaac'))

// 正则方法
const reg = /(.)\1+/g // 匹配一组词，出现次数大于 1 即可
console.log('aaabbaacc'.match(reg))
