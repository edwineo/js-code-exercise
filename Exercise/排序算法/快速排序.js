// 不断拆解成两个数组，然后继续递归的拆解（先序遍历）

// 1. 从数列中挑出一个元素，称为 "基准"（pivot）;
// 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序

function quickSort (nums) {
  if (nums.length <= 1) {
    return nums
  }
  // 基准值
  const pivot = nums[nums.length - 1]
  // 分区块
  const left = nums.filter((item, index) => item <= pivot && index !== nums.length - 1) // 因为是小于等于，所以这个时候需要判断 index 不为那个元素
  const right = nums.filter(item => item > pivot)
  return [...quickSort(left), pivot, ...quickSort(right)]
}

const nums = [1, 3, 2, 4, 5, 0, 9, 8, 7]
console.log(quickSort(nums))

// ● 时间复杂度：平均 O(nlogN)、最好 O(nlogN)、最坏 O(n²)
// ● 空间复杂度：O(nlogN)
// ● In-place 内排序
// ● 不稳定
