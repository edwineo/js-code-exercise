function uniqueArr (arr) {
  return [...new Set(arr)]
}

const arr = [1, 2, 2, 3, 3]
console.log(uniqueArr(arr))