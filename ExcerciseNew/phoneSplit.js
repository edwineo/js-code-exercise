// 手机号 3-4-4 分割

// slice 版本
function phoneSplit (number) {
  const str = String(number)
  return `${str.slice(0, 3)}-${str.slice(3, 7)}-${str.slice(7)}`
}

function phoneSplit2 (number) {
  const str = String(number)
  return `${str.slice(0, 3)}-${str.slice(3, 7)}-${str.slice(7)}`
}

// 正则版本
function phoneSplit(number) {
  const str = String(number)
  return str.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}

function phoneSplitRegex (number) {
  const str = String(number)
  return str.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}
