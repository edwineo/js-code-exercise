function coinChange (coins, amount) {
  const f = new Array(amount + 1).fill(0)
  f[0] = 0
  for (let i = 1; i <= amount; i++) {
    // 给个较大的初始值
    f[i] = Infinity
    for (let j = 0; j < coins.length; j++) {
      // i 才是当前的这个金额
      if (i >= coins[j]) {
        f[i] = Math.min(f[i], f[i - coins[j]] + 1)
      }
    }
  }
  if (f[amount] === Infinity) {
    return -1
  }
  return f[amount]
}