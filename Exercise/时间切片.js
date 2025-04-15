function loop (curTotal, curIndex) {
  if (curTotal < 0) {
    return
  }

  const pageCount = Math.min(curTotal, once)

  window.requestAnimationFrame(() => {
    for (let i = 0; i < pageCount; i++) {
      const element = document.createElement('div')
      element.innerHTML = `new${curIndex + i}`
      ul.append(element)
    }
    // 下一次切片
    loop(curTotal - pageCount, curIndex + pageCount)
  })
}

const total = 2000
const once = 10
loop(total, 0)