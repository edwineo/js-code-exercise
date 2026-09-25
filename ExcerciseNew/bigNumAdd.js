// 大数相加
// 实现一个 add 方法完成两个大数相加

// let a = "9007199254740991";
// let b = "1234567899999999999";

// 常规方式
function add (a, b) {
  // carry 进位
  let res = ''
  let carry = 0

  let i = a.length - 1
  let j = b.length - 1

  while (i >= 0 || j >= 0 || carry) {
    let sum = Number(i >= 0 ? a[i] : 0) + Number(j >= 0 ? b[j] : 0) + carry

    res = (sum % 10) + res

    if (sum >= 10) {
      carry = 1
    } else {
      carry = 0
    }

    i--
    j--
  }
  
  return res
}

  // carry 进位
  // 从后往前遍历
  function bigNumAdd (a, b) {
    let res = ''
    let carry = 0
    let i = a.length - 1
    let j = b.length - 1

    while (i >= 0 || j >= 0 || carry) {
      const sum = Number(i >= 0 ? a[i] : 0) + Number(j >= 0 ? b[j] : 0) + carry

      if (sum >= 10) {
        carry = 1
      } else {
        carry = 0
      }

      res = (sum % 10) + res
      i--
      j--
    }

    return res
  }

console.log(add("123456789123456789", "987654321987654321")); 


// BigInt 方式实现
function bigIntAdd (a, b) {
  return (BigInt(a) + BigInt(b)).toString()
}
