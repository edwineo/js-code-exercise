// WebSocket → dispatch(updateOrderBook(data)) → reducer → 新 state 对象 → useSelector → shallowEqual → 重渲染？
// 从一个高频而容易答偏的题开始。有一个实时交易的 Order Book 组件
// 接收 WebSocket 推送的买卖盘数据（每秒几百条），需要渲染一个可排序的深度列表，并且用户可以点击某一行高亮。
// 另外这个 Order Book 的数据还需要被页面右上角的一个"当前价差"徽章共享。
// 问题：你选什么状态管理方案？给出选择的关键理由，不是"这个好那个不好"的罗列，而是为什么在这个场景下非它不可。
// 在 Redux、MobX、Zustand、Context 之间做选择并给出理由

// Redux 做 Order Book 的数据流： WebSocket → dispatch → reducer（产生新 state 对象）→ useSelector（用 === 对比）→ 判断是否重新渲染。
// 问题在哪？每秒几百条推送，每条推送都经过完整的 dispatch → reducer → 所有 selector 重新计算 → 所有订阅组件可能重渲染。
// 即使你用 createSelector 做 memo，100 个 selector 各自 memo、各自对比，CPU 开销和心智负担都高。

// MobX 的优势： WebSocket → 直接修改 observable → Atom 自动通知精准订阅者。
// 中间没有 reducer、没有 selector、没有 memo 对比——链路短、心智负担低、精度天然高。

// Redux 也不是完全不能做： 用 Redux Toolkit 的 createEntityAdapter + createSelector + React.memo，可以达到类似的渲染性能。
// 但代价是你的团队得深入理解 selector memo 机制，而且状态结构必须是范式化的（normalized）——Orders、Asks、Bids 分开存。
// MobX 不需要这些额外的心智负担。

