function add1 (a, b) {
  let i = a.length - 1
  let j = b.length - 1
  let carry = 0
  let res = ''

  while (i >= 0 || j >= 0 || carry) {
    const x = i >= 0 ? Number(a[i]) : 0
    const y = j >= 0 ? Number(b[j]) : 0

    const sum = x + y + carry

    res = `${sum % 10}${res}`
    carry = Math.floor(sum / 10)

    i--
    j--
  }

  return res
}

// 测试
console.log(add1("123456789123456789", "987654321987654321")); 
// 预期输出："1111111111111111110"


// BigInt 方式实现
function add2 (a, b) {
    return (BigInt(a) + BigInt(b)).toString();
}

// 测试
console.log(add2("123456789123456789", "987654321987654321")); 
// 预期输出："1111111111111111110"