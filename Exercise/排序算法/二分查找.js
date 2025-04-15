// 确定一个数在有序数组中的位置

function search (nums, target, start, end) {
  if (start === end) {
    // 递归终点
    return start
  }

  const mid = (start + end) >> 1
  let targetIndex = -1 // 目标元素的下标

  // 剪枝
  if (nums[mid] === target) {
    targetIndex = mid
    return targetIndex
  }

  // 二分法
  if (nums[mid] < target) {
    return search(nums, target, mid + 1, end)
  } else {
    return search(nums, target, start, mid - 1)
  }
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 6
const position = search(nums, target, 0, nums.length - 1);
if (position !== -1) {
  console.log(`目标元素在数组中的位置:${position}`);
} else {
  console.log("目标元素不在数组中");
}
