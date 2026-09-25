// 求两个数组的交集

// 先排序，再双指针法
function interSect (arr1, arr2) {
  arr1.sort((a, b) => a - b)
  arr2.sort((a, b) => a - b)

  const len1 = arr1.length
  const len2 = arr2.length
  let i = 0
  let j = 0
  const res = []

  while (i < len1 && j < len2) {
    if (arr1[i] === arr2[j]) {
      res.push(arr1[i])
      i++
      j++
    } else if (arr1[i] < arr2[j]) {
      i++
    } else {
      j++
    }
  }

  return res
}
