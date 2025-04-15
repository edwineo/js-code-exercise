// 实现一个方法使多维数组变成一维数组

// 方法一：使用递归
function flatter(arr) {
  if (!arr.length) {
    return
  }
  return arr.reduce((acc, cur) => {
    return Array.isArray(cur) ? [...acc, ...flatter(cur)] : [...acc, cur]
  }, [])
}

// 方法二：使用迭代，while 循环
function flatter2(arr) {
  if (!arr.length) {
    return
  }
  while (arr.some(i => Array.isArray(i))) {
    // 存在还未拍平的数组时，每次只拍平一层，直到所有元素都拍平
    arr = [].concat(...arr)
  }
  return arr
}

const arr = [1, 2, [1, [2, 3, [4, 5, [6]]]]]

console.log(flatter2(arr));