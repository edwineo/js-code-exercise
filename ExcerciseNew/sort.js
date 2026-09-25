// 排序算法

// 冒泡排序
// 从第一个元素开始，重复比较相邻的两个项，若第一项比第二项更大，则交换两者的位置；反之不动。每一轮操作，都会将这一轮中最大的元素放置到数组的末尾。
function bubbleSort (nums) {
  const len = nums.length

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }

  return nums
}

// 选择排序
// 循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作，直至数组完全有序为止。
function selectSort (nums) {
  const len = nums.length

  for (let i = 0; i < len; i++) {
    let minIndex = i
    
    // 不断缩小区间
    for (let j = i + 1; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }

    [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
  }

  return nums
}

// 插入排序
// 找到元素在它前面那个有序序列中的正确位置。插入排序所有的操作都基于一个这样的前提：当前元素前面的那个序列是有序的；基于这个前提，从后往前去寻找当前元素在前面那个序列里的正确位置
function insertSort (nums) {
  const len = nums.length

  for (let i = 1; i < len; i++) {
    let j = i - 1
    const temp = nums[i]

    while (j >= 0 && temp < nums[j]) {
      // 以 temp 为基准，不断往后推一位，这样就算是 insert 插入了
      nums[j + 1] = nums[j]
      j--
    }

    // 因为上一步 j-- 了，所以找到目标位置 j + 1 之后，将 temp 的值赋值到这个位置，也就相当于插入了
    nums[j + 1] = temp
  }

  return nums
}

// 归并排序
// 对分治思想的典型应用
// 1. 分解子问题
// 2. 求解每个子问题
// 3. 合并所有子问题的解

function mergeSort (nums) {
  const len = nums.length

  if (len <= 1) {
    return nums
  }

  // split
  const mid = len >> 1
  return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid, len)))
}

function merge (arr1, arr2) {
  // 双指针法
  const len1 = arr1.length
  const len2 = arr2.length

  let i = 0
  let j = 0
  const res = []
  
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }

  while (i < len1) {
    res.push(arr1[i])
    i++
  }
  while (j < len2) {
    res.push(arr2[j])
    j++
  }

  return res
}

// 快速排序
// 基本思想上和归并排序是一致的，仍然坚持“分而治之”的原则不动摇。区别在于，快速排序并不会把真的数组分割开来再合并到一个新数组中去，而是直接在原有的数组内部进行排序。
// 1. 从数列中挑出一个元素，称为 "基准"（pivot）;
// 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序
function sort (nums) {
  const len = nums.length
  quickSort(nums, 0, len - 1)
  return nums
}

function quickSort (nums, start, end) {
  if (start >= end) {
    return
  }

  // 分解成两个子数组，并返回 mid 基准值
  const mid = partition(nums, start, end)

  quickSort(nums, start, mid - 1)
  quickSort(nums, mid + 1, end)
}

function partition (nums, start, end) {
  // 以中间的值为基准值（随意取的，所以快速排序的复杂度在于基准值取的好不好）
  const pivot = nums[(start + end) >> 1]
  let left = start
  let right = end

  while (left <= right) {
    while (nums[left] < pivot) {
      left++
    }
    while (nums[right] > pivot) {
      right--
    }

    // 若 left <= right，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
    if (left <= right) {
      [nums[left], nums[right]] = [nums[right], nums[left]]
      left++
      right--
    }
  }

  // 最后返回 left 和 right 都可以，作为下一次分区的基准
  return left
}

// 快速排序简单版
function quickSortNew (nums) {
  if (nums.length <= 1) {
    return nums
  }

  const pivot = nums[nums.length - 1]
  const left = nums.filter((v, i) => v <= pivot && i !== nums.length - 1)
  const right = nums.filter(v => v > pivot)

  return [...quickSortNew(left), pivot, ...quickSortNew(right)]
}

// 二分查找
// 二分法，确定一个数在有序数组中的位置
function search (nums, target, start, end) {
  if (start >= end) {
    return -1
  }

  let mid = (start + end) >> 1
  
  // 剪枝，提前找到
  if (nums[mid] === target) {
    return mid
  }

  if (nums[mid] < target) {
    return search(nums, target, mid + 1, end)
  } else {
    return search(nums, target, start, mid - 1)
  }
}

function search2 (arr, target, start, end) {
  // 递归终点
  if (start >= end) {
    return -1
  }
  
  // 二分法一定要找中间 mid 节点
  const mid = (start + end) >> 1
  if (arr[mid] === target) {
    return mid
  }
  if (target > arr[mid]) {
    return search2(arr, target, mid + 1, end)
  } else {
    return search2(arr, target, start, mid - 1)
  }
}