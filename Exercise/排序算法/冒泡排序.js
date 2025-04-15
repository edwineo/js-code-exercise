function bubbleSort (nums) {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    // 内层从 0 到 len - i - 1 一直冒泡
    // 最后一位会自动置换，所以不需要遍历
    for (let j = 0; j < len - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}

const nums = [1, 3, 2, 4, 5, 0]
console.log(bubbleSort(nums))

// ● 时间复杂度：平均 O(n²)、最好 O(n²)、最坏 O(n²)
// ● 空间复杂度：O(1)
// ● In-place 内排序
// ● 稳定
