// 写一个 react 自定义 hooks，模拟键盘输入的场景，一个值在 500ms 内如果变动了多次，只取最后一次的的变动。
// 这个 hook 入参是一个字符串和 delay 时间，返回一个字符串

const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  // 这样每次 value 变了之后，这里重新执行
  // 首先执行上次 setTimeout 的清除，然后生成新的定时器
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
// 参考：https://chatgpt.com/share/67f9e4fa-c9e8-8010-9677-67f9663bc4c6

// 对执行函数 callback 的 debounce
// 上一个实现是对 “值” 的 debounce，现在需要实现对 副作用(callback) 的 debounce
const useDebouncedCallback = (callback, delay, deps) => {
  const timer = useRef(null);
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    // 设置新的防抖定时器
    timer.current = setTimeout(() => {
      callbackRef.current();
    }, delay);

    // 清除副作用（组件卸载或依赖变更时）
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [...deps, delay]); // delay 也作为依赖
}

// 进一步场景：搜索框的产品说要加一个功能：用户按 Enter 键时，立刻用当前输入值发起搜索，不等 300ms 的 debounce。
// 你得改上面的 useDebounce 来支持这个。
// 本质上是「带逃逸条件」的 debounce
// 返回一个 flush 函数让调用方自己触发
const useDebouncedValue2 = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timer = useRef(null)
  const latestValue = useRef(value) // 最新的，只要 value 变化了会在 re-render 的时候直接变化这个值
  latestValue.current = value

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebouncedValue(latestValue.current)
    }, delay)

    return () => {
      clearTimeout(timer.current)
    }
  }, [value, delay])

  const flush = useCallback(() => {
    clearTimeout(timer.current)
    setDebouncedValue(latestValue.current)
  }, [])

  return {
    debouncedValue,
    flush,
  }
}