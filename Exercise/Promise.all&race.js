function all (promiseArr) {
  // 计数器，记录返回的 promise
  let count = 0
  const result = new Array(promiseArr.length)
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i]).then((res) => {
        result[i] = res
        count++
        if (count === promiseArr.length) {
          // 最终返回
          resolve(result)
        }
      }, (err) => {
        reject(err)
      })
    }
  })
}

function race (promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i]).then(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    }
  })
}

// race 实现竞争
const timer1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('3000')
  }, 3000);
})
const timer2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('5000')
  }, 5000);
})
Promise.race([timer1, timer2]).then((res) => {
  console.log(res)
})