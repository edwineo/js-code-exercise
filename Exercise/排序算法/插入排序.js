// 插入排序所有操作都基于这样一个前提：当前元素之前的所有元素是有序的

function insertSort (nums) {
  const len = nums.length
  for (let i = 1; i < len; i++) {
    // i 代表每次的当前元素，所以从 1 开始
    const cur = nums[i]
    let j = i - 1
    while (j >= 0 && cur < nums[j]) {
      // 注意，此时数组需要不断前进，因为 cur 最终要插入
      nums[j + 1] = nums[j]
      j--
    }
    // 找到位置了，此时 nums[j + 1] 的位置是空出来的
    nums[j + 1] = cur
  }
  return nums
}

const nums = [1, 3, 2, 4, 5, 0, 9, 8, 7]
console.log(insertSort(nums))

// ● 时间复杂度：平均 O(n²)、最好 O(n)、最坏 O(n²)
// ● 空间复杂度：O(1)
// ● In-place 内排序
// ● 稳定
