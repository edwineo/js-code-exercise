// 一次遍历，找出数组中第二大的数
function findSecond (arr, repet = false) {
  let max = -Infinity
  let second = -Infinity
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if ((repet && arr[i] >= max) || (!repet && arr[i] > max)) {
      second = max
      max = arr[i]
    }
    if (arr[i] < max && arr[i] > second) {
      second = arr[i]
    }
  }
  return second === -Infinity ? -1 : second
}
const arr = [9, 9, 9]
console.log(findSecond(arr, true))
