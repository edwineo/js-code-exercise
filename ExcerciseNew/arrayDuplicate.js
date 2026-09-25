// 整数数组是否存在重复元素

function containsDuplicate (nums) {
  const set = new Set()

  for (const num of nums) {
    if (set.has(num)) {
      return true
    }
    set.add(num)
  }

  return false
}

function containsDuplicate2 (nums) {
  const set = new Set()

  for (const num of nums) {
    if (set.has(num)) {
      return true
    }
    set.add(num)
  }

  return false
}
