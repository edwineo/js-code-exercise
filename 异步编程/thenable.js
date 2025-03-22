const p = new Promise((resolve, reject) => {
  resolve({
    then(res, rej) {
      res('hello')
    }
  })
})

p.then(res => console.log(res))

// hello 