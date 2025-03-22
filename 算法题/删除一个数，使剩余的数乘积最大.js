// 删除一个元素后，使剩余元素乘积最大，找出这个数的下标
function delOneNum (arr) {
  const len = arr.length
  let count = 0
  let negativeMinIndex = 0
  let negativeMaxIndex = 0
  let positiveMinIndex = 0
  for (let i = 0; i < len; i++) {
    // 统计负数的个数
    if (arr[i] < 0) {
      count++
    }

    if (arr[i] < 0) {
      // 找出绝对值最小的负数
      if (arr[negativeMinIndex] >= 0 || arr[i] > arr[negativeMinIndex]) {
        negativeMinIndex = i
      }
      // 找出绝对值最大的负数
      if (arr[negativeMaxIndex] >= 0 || arr[i] < arr[negativeMinIndex]) {
        negativeMaxIndex = i
      }
    } else {
      // 找出最小的非负数
      if (arr[positiveMinIndex] < 0 || arr[i] < arr[positiveMinIndex]) {
        positiveMinIndex = i
      }
    }
  }
  // 奇数个负数，则返回绝对值最小的负数
  if (count && count % 2 === 1) {
    return negativeMinIndex
  }
  // 偶数个负数
  if (count && count % 2 === 0) {
    if (count === len) {
      // 并且全是负数，则返回绝对值最大的负数
      return negativeMaxIndex
    } else {
      // 存在正数，则返回最小的非负数
      return positiveMinIndex
    }
  }
}
const arr = [0, 1, -1, -3]
console.log(delOneNum(arr))
