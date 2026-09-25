// 数组去重

function uniqueArr (arr) {
  return [...new Set(arr)];
}

function uniqueArr2 (arr) {
  const set = new Set(arr)
  return [...set]
}
// 方法 2：使用 filter + indexOf 或者哈希表记录

console.log(uniqueArr([1, 2, 2, 3]))