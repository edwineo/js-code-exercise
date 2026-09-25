// 利用 XMLHttpRequest 手写 AJAX 实现

function getJson (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('get', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onReadyStateChange = () => {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send()
  })
}