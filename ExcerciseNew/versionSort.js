// 有一组版本号如下 ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
// 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

function versionSort (arr) {
  arr.sort((a, b) => {
    const arr1 = a.split('.')
    const arr2 = b.split('.')
    
    const len = Math.max(arr1.length, arr2.length)

    for (let i = 0; i < len; i++) {
      const num1 = Number(arr1[i] || 0)
      const num2 = Number(arr2[i] || 0)

      if (num1 !== num2) {
        return num2 - num1
      }
    }

    return 0
  })
}

function versionSort2 (arr) {
  arr.sort((a, b) => {
    const nums1 = a.split('.')
    const nums2 = b.split('.')

    const len = Math.max(nums1.length, nums2.length)

    for (let i = 0; i < len; i++) {
      // 以最长的 length 来遍历，则需要考虑到 undefined 兼容为 0
      const num1 = Number(nums1[i] || 0)
      const num2 = Number(nums2[i] || 0)

      // 比大小
      if (num1 !== num2) {
        return num2 - num1
      }

      // 否则是相等的，则继续递归
    }

    // 没有对比出结果，则返回 0
    return 0
  })
}