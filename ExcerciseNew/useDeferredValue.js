// useDeferred 用到搜索场景，你通常是两个 state：

// const [input, setInput] = useState('');        // 输入框的值
// const deferredInput = useDeferredValue(input);  // 传给列表的值

// input 是普通 useState，每次按键都立刻更新——这是高优先级的，输入框跟手显示。
// deferredInput 是 input 的滞后副本——当用户快速输入"react"五个字母时，deferredInput 可能停在"re"、"rea"，渲染列表时先用这些旧值，等用户停止输入后才追上"react"。

// 所以两条时间线：
// 1. input：紧跟用户的，高优先级，驱动输入框渲染
// 2. deferredInput：滞后追赶的，低优先级，驱动列表渲染
// 它们是同一个来源（input），但取值速度不同。

