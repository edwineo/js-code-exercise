function sort (nums) {
  const len = nums.length
  // 这里的 i 代表本次循环结束后，需要确定的最小值元素位置
  for (let i = 0; i < len; i++) {
    let minIndex = i
    // 不断缩小区间
    for (let j = i + 1; j < len; j++) {
      if (nums[minIndex] > nums[j]) {
        minIndex = j
      }
    }
    // 每次循环结束后，将最小值放到开头
    [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
  }
  return nums
}

console.log(sort([2,4,9,1,2,3,11,10, 111, 101]))