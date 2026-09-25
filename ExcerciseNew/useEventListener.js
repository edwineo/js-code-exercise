// 要求：实现一个 hook，能够自动绑定到目标元素、自动清理、支持目标元素动态变化。你怎么写？

const useEventListener = (target, type, handler) => {
  const savedhandler = useRef(handler)

  useEffect(() => {
    // 如果 handler 是内联函数（useEventListener(ref, 'click', () => setCount(c => c+1))）
    // 每次 render 都是新引用。放进依赖会导致 effect 反复解绑/重绑——频繁操作真实 DOM 事件，性能差。
    // savedHandler 用 ref 保持最新引用，事件绑定只发生一次。
    savedhandler.current = handler
    // 考虑到了 handler 变化频繁的场景
  }, [handler])

  useEffect(() => {
    const element = target.current || target // 兼容传递 ref
    if (!element) {
      return
    }

    const listener = (event) => {
      savedhandler.current(event)
    }

    element.addEventListener(type, listener)
    return () => {
      element.removeEventListener(type, listener)
    }
  }, [target, type])
}
// 上述用 ref 包裹 handler 的原因，考虑 闭包的场景
// 举个例子：
// function App() {
//   const [count, setCount] = useState(0);
//   const divRef = useRef(null);

//   const handleClick = () => {
//     console.log(count);  // 这是闭包里的 count，不是 event
//   };

//   useEventListener(divRef, 'click', handleClick);

//   return (
//     <>
//       <div ref={divRef}>点我</div>
//       <button onClick={() => setCount(c => c + 1)}>count: {count}</button>
//     </>
//   );
// }
// 首次渲染 count = 0，handleClick 闭包捕获了 0
// 用户点 "count + 1"，count = 1，re-render → 新的 handleClick 闭包捕获了 1 → useEffect 里 savedHandler.current 更新为新函数
// 用户点 div → savedHandler.current(event) 调用的是最新的 handleClick → 打印 1
// 所以答案是：能拿到最新 state，前提是 useEffect(() => { savedHandler.current = handler }) 在每次 render 后都会更新 ref。这个同步更新发生在 commit 阶段，时机正确。

// 这就是 savedHandler 模式的精髓：ref 层是一个"引用交换机"——handler 每次都换，但不碰 DOM；事件绑定稳定，但永远执行最新的函数。