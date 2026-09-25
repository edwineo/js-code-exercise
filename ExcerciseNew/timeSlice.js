// 分片思想，解决大数据量渲染问题
// 渲染百万条结构简单的大数据时，怎么使用分片思想优化渲染？

// 为什么用 requestAnimationFrame 而不是 setTimeout
// requestAnimationFrame 会在浏览器下一次重绘前执行，与浏览器刷新频率同步（通常 60fps），比 setTimeout 更适合 UI 渲染任务。

const ul = document.getElementById('container')
const total = 10000
const once = 20 // 一次插入 20 条
let index = 0

function timeSlice (curTotal, curIndex, once) {
  if (curTotal <= 0) {
    return
  }

  const pageCount = Math.min(once, curTotal)

  window.requestAnimationFrame(() => {
    // 当前帧的分片渲染
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < pageCount; i++) {
      const el = document.createElement('li')
      el.innerHTML = `new ${curIndex + i}`
      fragment.appendChild(el)
    }
    ul.appendChild(fragment)
    // 下一帧的分片渲染
    timeSlice(curTotal - pageCount, curIndex + pageCount, once)
  })
}

function timeSlice2 (curTotal, curIndex, pageSize) {
  if (curTotal <= 0) {
    return
  }

  const pageCount = Math.min(pageSize, curTotal)

  window.requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment()
    // 时间切片操作，本次只渲染 pageCount 这么多个的内容
    for (let i = 0; i < pageCount; i++) {
      const li = document.createElement('li')
      // ...
      // 做一些其他的渲染操作之类的
      fragment.appendChild(li)
    }
    ul.appendChild(fragment)
    timeSlice2(curTotal - pageCount, curIndex + pageCount, pageSize)
  })
}

timeSlice(total, index, once)
// 对于大数据量的简单 dom 结构渲染可以用分片思想解决
// 但如果是复杂的 dom 结构渲染如何处理？这时候就需要使用虚拟列表了
// 虚拟列表解决 DOM 数量过多的问题，timeSlice 解决一次性执行太多 JS 的问题


// 进一步扩展：如何渲染百万条千万条数据呢？

// 1. 使用分页加载

// 2. 使用 requestAnimationFrame 分片渲染，避免长任务阻塞主线程

// 3. 使用 DocumentFragment 减少 DOM 插入次数

// 4. 如果最终 DOM 数量仍然巨大，使用虚拟列表（Virtual List），只渲染可视区域节点