function sort (nums) {
  return mergeSort(nums)
}

function mergeSort (nums) {
  const len = nums.length

  // 分解到只剩一个元素时，开始回溯
  if (len <= 1) {
    return nums
  }

  // 开始分解
  const mid = len >> 1
  // 因为会先执行每个入参的流程，所以先执行 mergeSort 后执行 merge，整个是一个后序遍历的过程
  return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid, len)))
}

// 合并两个有序数组
function merge (arr1, arr2) {
  // 双指针法
  const len1 = arr1.length
  const len2 = arr2.length
  let i = 0
  let j = 0
  const res = []
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }
  // 遍历完后，哪个数组还有剩余，则直接放入
  while (i < len1) {
    res.push(arr1[i])
    i++
  }
  while (j < len2) {
    res.push(arr2[j])
    j++
  }
  return res
}

console.log(sort([2,4,9,1,2,3,11,10, 111, 101]))