//静态方法
function all(promiseArr) {
  let result = [];
  // 声明一个计数器，每一个 promise 返回就加一
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      //这里用 Promise.resolve 包装一下 防止不是 Promise 类型传进来
      Promise.resolve(promiseArr[i]).then(
        (res) => {
          //这里不能直接push数组，因为要控制顺序一一对应(感谢评论区指正)
          result[i] = res;
          count++;
          //只有全部的promise执行成功之后才resolve出去
          if (count === promiseArr.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
}

function PromiseAll (promiseArr) {
  const len = promiseArr.length
  const result = new Array(len)
  let count = 0 // 计数
  return new Promise((resolve, reject) => { // 只有这一层的 promise 被 resolve 了才返回
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then(res => { // 用 Promise.resolve 包一层，防止传入的不是 promise
        result[i] = res
        count++
        if (count === len) {
          resolve(result)
        }
      }).catch(e => {
        reject(e)
      })
    }
  })
}

function PromiseRace (promiseArr) {
  return new Promise((resolve, reject) => { // 只有这一层的 promise 被 resolve 了才返回
    const len = promiseArr.length
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then(res => { // 用 Promise.resolve 包一层，防止传入的不是 promise
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    }
  })
}
