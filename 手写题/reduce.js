Array.prototype.reduce = function (callback, initialValue) {
  // 因为是 arr.reduce(() => {}, xx)，所以 this 就是 arr
  // 先绑定 this
  let arr = this
  const len = arr.length
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function')
  }
  if (len === 0 && typeof initialValue === 'undefined') {
    throw new TypeError('Reduce of empty array with no initial value')
  }

  // 初始值
  let prevValue, currentIndex
  if (typeof initialValue === 'undefined') {
    prevValue = arr[0]
    currentIndex = 1
  } else {
    prevValue = initialValue
    currentIndex = 0
  }
  for (let i = currentIndex; i < len; i++) {
    prevValue = callback(prevValue, arr[i] /* 当前值 */, currentIndex, arr)
  }
  return prevValue
}