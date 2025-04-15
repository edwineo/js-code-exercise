const stateStore = []
const stateIndex = 0

function useState (initialState) {
  const curIndex = stateIndex
  stateStore[curIndex] = stateStore[curIndex] ?? initialState

  function setState (newValue) {
    if (typeof newValue === 'function') {
      // 回调函数类型
      stateStore[curIndex] = newValue(stateStore[curIndex])
    } else {
      // 值类型
      stateStore[curIndex] = newValue
    }
    render() // 触发组件渲染
  }

  stateIndex++ // 移动到下一个 Hook
  return [stateStore[curIndex], setState]
}

// 模拟组件渲染
function render () {
  stateIndex = 0
  App()
}

function App () {
  
}