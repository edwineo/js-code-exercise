// 判断⼀个字符串中出现次数最多的字符，统计这个次数

// 'abcccdc'
// c, 3

// function countStr (str) {
//   const map = {}
//   const len = str.length
//   for (let i = 0; i < len; i++) {
//     if (map[str[i]]) {
//       map[str[i]] += 1
//     } else {
//       map[str[i]] = 1
//     }
//   }
//   let max = 0
//   let maxKey = null
//   for (let key in map) {
//     if (map[key] > max) {
//       maxKey = key
//       max = map[key]
//     }
//   }
//   return {
//     max,
//     maxKey,
//   }
// }

// const str = 'abcccdc'
// console.log(countStr(str))


// [[1, 3], [2, 3]]
function merge (arr) {
  const len = arr.length
  let pre = arr[0]
  const res = []
  for (let i = 1; i < len; i++) {
    if (pre[1] >= arr[i][0]) {
      pre[1] = Math.max(pre[1], arr[i][1])
    } else {
      res.push(pre.slice())
      pre = arr[i]
    }
  }
  res.push(pre.slice())
  return res
}
const arr = [[1, 3], [2, 4], [6, 7]]
console.log(merge(arr))