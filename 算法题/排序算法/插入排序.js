function sort (nums) {
  const len = nums.length
  // 这里的 i 代表每次的目标元素，所以从 1 开始
  for (let i = 1; i < len; i++) {
    let j = i - 1 // 前面那个区间的末尾
    const temp = nums[i] // 一定要缓存这个值，因为数组会不断的往后推一位
    while (j >= 0 && temp < nums[j]) {
      nums[j + 1] = nums[j] // 不断往后推一位
      j--
    }
    // 因为上一步 j-- 了，所以找到目标位置 j + 1 之后，将 temp 的值赋值到这个位置，也就相当于插入了
    nums[j + 1] = temp
  }
  return nums
}

console.log(sort([2,4,9,1,2,3,11,10, 111, 101]))