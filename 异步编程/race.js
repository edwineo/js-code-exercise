const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p1')
    resolve('p1 result')
  }, 5000)
})

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p2')
    resolve('p2 result')
  }, 3000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p3')
    reject('p3 result')
  }, 1000)
})

Promise.race([p1, p2, p3]).then((res) => {
  console.log('结果', res)
}, err => Promise.reject('error')).catch(err => {
  console.log('报错', err)
})
