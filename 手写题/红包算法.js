const m = 10000
const n = 30
function red_pocket (m, n) {
  if (m / n < 0.01) {
    console.log('人数过多')
    return
  }
  const res = []
  const segList = []
  for (let i = 0; i < n - 1; i++) {
    const random = Math.random() * m;
    segList.push(random)
  }
  if (!segList.length) {
    return [m]
  }
  segList.sort((a, b) => a - b)
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      res.push(segList[i])
    } else if (i === n - 1) {
      res.push(m - segList[n - 2])
    } else {
      res.push(segList[i] - segList[i - 1])
    }
  }
  return res
}
console.log(red_pocket(m, n))
