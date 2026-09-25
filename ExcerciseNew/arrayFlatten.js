// 数组扁平化

// 递归版本
function flatter (arr) {
  if (!arr.length) {
    return;
  }
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur];
  }, [])
}

// 迭代版本
function iterateFlatter (arr) {
  if (!arr.length) {
    return;
  }
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

function flatter2 (arr) {
  if (!arr.length) {
    return
  }
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatter2(cur)] : [...pre, cur]
  })
}

function iterateFlatter2 (arr) {
  if (!arr.length) {
    return
  }
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));