// 零钱兑换
// 给你一个整数数组 coins，表示不同面额的硬币；以及一个整数 amount，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。你可以认为每种硬币的数量是无限的。

function coinChange (coins, amount) {
  const f = new Array(amount + 1).fill(Infinity)

  const len = coins.length
  f[0] = 0

  for (let i = 1; i <= amount; i++) {
    // i 表示 1 ~ amount 的总数值

    // j 表示 coins 对应面值
    for (let j = 0; j < len; j++) {
      // 对于每个金额 i，都会尝试使用每一种硬币 coin 作为最后一枚硬币。如果选择了 coin，问题就转化为求解 i - coin 的最优解。
      // 而 f[i - coin] 本身已经允许使用任意次数的硬币，因此当前硬币也就自然可以被重复使用，从而形成完全背包模型。
      if (i - coins[j] >= 0) {
        f[i] = Math.min(f[i], f[i - coins[j]] + 1)
      }
    }
  }

  return f[amount] === Infinity ? -1 : f[amount]
}

function coinChange2 (coins, amount) {
  const f = new Array(amount + 1).fill(Infinity)

  f[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      // 此时能够赋值
      if (i - coins[j] >= 0) {
        f[i] = Math.min(f[i], f[i - coins[j]] + 1)
      }
    }
  }

  return f[amount] === Infinity ? -1 : f[amount]
}
