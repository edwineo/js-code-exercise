// 每次都找出当前范围的最小值，将其放在头部

function selectSort (nums) {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    // 当前的 i 就是最小值的位置，后续将其置换
    let minIndex = i
    for (let j = minIndex + 1; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    // 前面只是不断的改变 minIndex，最后再统一做一次交换即可
    if (minIndex !== i) {
      [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
    }
  }
  return nums
}

const nums = [1, 3, 2, 4, 5, 0]
console.log(selectSort(nums))

// ● 时间复杂度：平均 O(n²)、最好 O(n²)、最坏 O(n²)
// ● 空间复杂度：O(1)
// ● In-place 内排序
// ● 不稳定
