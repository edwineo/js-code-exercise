// 有一组版本号如下 ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
// 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5', '4.2', '2.3.3','0.302.1','0.1.1']

function versionSort (nums) {
  nums.sort((a, b) => {
    const aList = a.split('.')
    const bList = b.split('.')
    let i = 0
    while (true) {
      const left = aList[i]
      const right = bList[i]
      i++

      if (left === undefined || right === undefined) {
        // 其中一个值没有了，则 length 长一点的那个要大一些
        return bList.length - aList.length
      }

      // 继续循环比较
      if (left === right) {
        continue
      }

      // 正常比较
      return right - left
    }
    
  })
  return nums
}

const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
console.log(versionSort(versions))
