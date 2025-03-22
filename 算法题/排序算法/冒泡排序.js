function sort (nums) {
  const len = nums.length
  // 这里的 i 代表排序的循环次数，每一次循环过后，最大的元素都冒泡到了最后面
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) { // 最后一位不需要遍历，因为会自动置换 j + 1 位的数字
      if (nums[j] > nums[j + 1]) {
        // 前面大于后面时，则交换顺序
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}

console.log(sort([2,4,9,1,2,3,11,10]))