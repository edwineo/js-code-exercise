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
  // quickSort(nums, 0, mid - 1)
  // quickSort(nums, mid + 1, end)
}

// 分解
function partition (nums, start, end) {
  // 双指针法

  // 以中间的值为基准值（随意取的，所以快速排序的复杂度在于基准值取的好不好）
  const pivot = nums[minIndex]
  console.log(pivot)
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

/**
 * 生成单个正负整数
 * @returns 
 */
const makeOneRandomNum = () => {
  const random = Math.random();
  const plusOrMinus = random < 0.5 ? -random : random;
  return parseInt(plusOrMinus * 10000);
}

/**
 * 生成任意多个随机正负整数
 * @returns 
 */
const makeAnyRandomNum = (count = 10) => {
  const list = [];
  let min = Infinity
  let minIndex
  for (let i = 0; i < count; i++) {
    const random = makeOneRandomNum()
    if (random >= 0 && random < min) {
      min = random
      minIndex = i
      console.log(min)
      console.log('minIndex', minIndex)
    }
    list.push(makeOneRandomNum());
  }
  return {
    list,
    min,
    minIndex
  }
}

console.time('生成100w正负随机整数耗时');
const { list, min, minIndex } = makeAnyRandomNum(1000000);
console.timeEnd('生成100w正负随机整数耗时');

console.log('------------------------------------------------')

console.time('去除负数---for循环---耗时');
sort(list)
const index = list.findIndex(i => i === min)
list.splice(0, index)
console.timeEnd('去除负数---for循环---耗时');

console.log('result1:', list)
