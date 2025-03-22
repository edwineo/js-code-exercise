const p = new Promise((resolve, reject) => {
  resolve(0)
})

p.then(1).then((res) => {
  console.log('res', res)
  return 2
}).catch((err) => {
  console.log('err', err)
})

// 0