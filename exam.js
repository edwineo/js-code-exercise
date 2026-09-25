// 你需要向后端发送 1000 个请求，但是有一个限制：每秒只能发送最多 5 个请求。
// 请补足 main 函数，按照这个速率限制将这 1000 个请求发送出去。

// 控制并发的 promise

// 主函数：限流发送请求
async function sendWithRateLimit(requests, limitPerSecond) {
  const total = requests.length
  let start = performance.now()

  function loop (requests, once) {
    if (!requests.length) {
      return Promise.resolve()
    }

    const pageSize = Math.min(total, once)
    for (let i = 0; i < pageSize; i++) {
      const curRequest = requests.shift()
      Promise.resolve(curRequest).then((res) => {
        console.log('请求成功')
      })
    }

    const check = () => {
      window.requestAnimationFrame(() => {
        const end = performance.now()
        if (end - start >= 1000) {
          loop(requests, once)
          start = performance.now()
        } else {
          check()
        }
      })
    }

    check()
  }

  loop(requests, limitPerSecond)
}

// 模拟一个请求函数
function mockRequest(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`result ${id}`);
    }, 100); // 模拟请求延迟
  });
}


// 准备 100 个请求函数
const requests = Array.from({ length: 100 }, (_, i) => () => mockRequest(i + 1));

// 执行限流请求
sendWithRateLimit(requests, 5).then(() => {
  console.log('所有请求已完成');
});


class PromiseLimit {
  constructor (requests, limitPerSecond) {
    this.requests = requests
    this.limitPerSecond = limitPerSecond
    this.work = []
    this._next()
  }
  _next () {
    if (!this.requests.length) {
      return
    }
    // 装填请求
    for (let i = 0; i < limitPerSecond; i++) {
      if (this.requests.length) {
        this.work.push(this.requests.shift())
      }
    }
    // 发起请求
    Promise.all(this.work).then((res) => {
      console.log(`请求成功，结果${res}`)
      this.work = []
    })
    setTimeout(() => {
      this._next()
    }, 1000)
  }
}

