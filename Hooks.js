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
export function useDebouncedCallback(
  callback,
  delay,
  deps
) {
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
