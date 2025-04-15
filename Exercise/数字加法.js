// 防止 0.1 + 0.2 !== 0.3

function plus (num1, num2) {
  let r1 = null
  let r2 = null

  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }

  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }

  const m = Math.pow(2, Math.max(r1, r2))
  return (num1 * m + num2 * m) / m
}
