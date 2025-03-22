function sort (nums) {
  const len = nums.length
  quickSort(nums, 0, len - 1)
  return nums
}

function quickSort (nums, start, end) {
  // 递归终点，此时数组排序完毕
  if (start >= end) {
    return
  }
  // 分解成两个子数组，并返回了基准值
  const mid = partition(nums, start, end)
  // 以基准值为中间点，再分别递归的排序两个子数组
  quickSort(nums, 0, mid - 1)
  quickSort(nums, mid + 1, end)
}

// 分解
function partition (nums, start, end) {
  // 双指针法

  // 以中间的值为基准值（随意取的，所以快速排序的复杂度在于基准值取的好不好）
  const pivot = nums[(start + end) >> 1];
  let left = start
  let right = end

  while (left < right) {
    while (nums[left] < pivot) {
      left++;
    }
    while (nums[right] > pivot) {
      right--;
    }
    // 若 left <= right，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
    if (left <= right) {
      [nums[left], nums[right]] = [nums[right], nums[left]]
      // 然后左右指针再前进一步
      left++
      right--
    }
  }
  // 最后返回 left 和 right 都可以，作为下一次分区的基准
  return left;
}

console.time('生成100w正负随机整数耗时');
console.log(11, sort([2,4,9,99,1,2,3,11,10, 111, 101]))
console.timeEnd('生成100w正负随机整数耗时');


function sort2 (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const cur = arr[arr.length - 1];
  const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
  const right = arr.filter((v) => v > cur);
  return [...sort2(left), cur, ...sort2(right)];
}
console.time('生成100w正负随机整数耗时');
console.log(22, sort2([111,101,9,99,1,2,3,11,10]))
console.timeEnd('生成100w正负随机整数耗时');
