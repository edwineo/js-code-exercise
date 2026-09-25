// 用来获取上一次渲染的值

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
// usePrevious 的核心就是 "读取"发生在 render 阶段，"写入"发生在 effect 阶段——这个时间差正好产生了一个 render 帧的快照。
// 本质上是一个延迟一帧的 ref

// 流程如下
// render  #1: ref.current = undefined  → 返回 undefined (首次没前值)
//               ↓ commit → effect: ref.current = value1  
// render  #2: ref.current = value1     → 返回 value1 (拿到了！)
//               ↓ commit → effect: ref.current = value2  
// render  #3: ref.current = value2     → 返回 value2
