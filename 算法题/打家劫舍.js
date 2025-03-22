/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function(nums) {
  // 一维动态规划
  // 在打家劫舍1的基础上，加上环形的判断
  const len = nums.length
  if (len === 1) {
    return nums[0]
  }
  if (len === 2) {
    return Math.max(nums[0], nums[1])
  }
  return Math.max(robRange(0, len - 2), robRange(1, len - 1))
  
  // 打家劫舍1的逻辑
  function robRange (start, end) {
    const dp = new Array(end - start + 1).fill(0)
    for (let i = start; i <= end; i++) {
        if (i === 0) {
            dp[i] = nums[0]
        } else if (i === 1) {
            dp[i] = start === 1 ? nums[1] : Math.max(nums[0], nums[1])
        } else {
            dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
        }
    }
    return dp[end]
  }
};

console.log(rob([2,3,2]))