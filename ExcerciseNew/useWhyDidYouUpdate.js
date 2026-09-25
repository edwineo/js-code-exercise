// 当 props 变化时，打印出具体哪个 prop 变了、从什么变到什么。
// 这道题是基于 usePrevious 来写的

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const useWhyDidYouUpdate = (name, props) => {
  // 上一次的 props
  const previousProps = usePrevious(props)

  useEffect(() => {
    if (previousProps) {
      const changedProps = {}
      const allKeys = new Set([...Object.keys(previousProps), ...Object.keys(props)])

      for (const key of allKeys) {
        if (Object.is(previousProps[key], props[key])) { // 对齐 react 源码内的用法
          changedProps[key] = {
            from: previousProps[key],
            to: props[key],
          }
        }
      }

      if (Object.keys(changedProps).length > 0) {
        console.log(`${name}' changed keys are ${changedProps}`)
      }
    }
  })
}
