let ul = document.getElementById('container')
const total = 10000
const once = 20
let index = 0
function loop (curTotal, curIndex) {
  if (curTotal < 0) {
    return
  }
  const pageCount = Math.min(curTotal, once) // 需要真实渲染出来的数量
  window.requestAnimationFrame(() => {
    // 渲染
    for (let i = 0; i < pageCount; i++) {
      const element = document.createElement('li')
      element.innerHTML = `new ${curIndex + i}`
      ul.appendChild(element)
    }
    // 下一次分片渲染
    loop(curTotal - pageCount, curIndex + pageCount)
  })
}
loop(total, index)
