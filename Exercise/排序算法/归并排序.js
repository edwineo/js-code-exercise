// 对分治思想的典型应用
// 1. 分割子问题
// 2. 求解子问题
// 3. 合并子问题的解

function mergeSort (nums) {
  if (nums.length <= 1) {
    return nums
  }

  const mid = nums.length >> 1
  const left = mergeSort(nums.slice(0, mid))
  const right = mergeSort(nums.slice(mid))
  return merge(left, right)
}

// 转换成「合并两个有序数组」的算法题
function merge (left, right) {
  const len1 = left.length
  const len2 = right.length
  let i = 0
  let j = 0
  const res = []
  while (i < len1 && j < len2) {
    if (left[i] <= right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }
  while (i < len1) {
    res.push(left[i])
    i++
  }
  while (j < len2) {
    res.push(right[j])
    j++
  }
  return res
}

const nums = [1, 3, 2, 4, 5, 0, 9, 8, 7]
console.log(mergeSort(nums))

// ● 时间复杂度：平均 O(nlogN)、最好 O(nlogN)、最坏 O(nlogN)
// ● 空间复杂度：O(N) 空间换时间
// ● Out-place 外排序
// ● 稳定