// Promise.all
function promiseAll (promiseArr) {
  const len = promiseArr.length
  const result = new Array(len)
  let count = 0

  return new Promise((resolve, reject) => {
    if (!len) {
      resolve([])
      return
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then((res) => {
        // 即使 promise 完成顺序不同，返回数组仍然按输入顺序
        result[i] = res
        count++
        if (count === len) {
          resolve(result)
        }
      }).catch((e) => {
        // 有一个 reject 就整体 reject
        reject(e)
      })
    }
  })
}

function promiseAll2 (promiseArr) {
  const len = promiseArr.length
  const result = new Array(len)
  let count = 0

  return new Promise((resolve, reject) => {
    if (!len) {
      resolve([])
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then((res) => {
        // 按照初始顺序返回
        result[i] = res
        count++
        if (count === len) {
          resolve(result)
        }
      }).catch((e) => {
        reject(e)
      })
    }
  })
}

function promiseRace (promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i]).then((res) => {
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    }
  })
}

function promiseRace2 (promiseArr) {
  const len = promiseArr.length
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      // 只要有一个先返回就可以，不管是正确还是错误的
      Promise.resolve(promiseArr[i]).then((res) => {
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    }
  })
}
