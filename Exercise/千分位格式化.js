function formatNumber (num) {
  const str = num.toString()
  if (str.length <= 3) {
    return str
  }
  return `${str.slice(0, -3)},${str.slice(-3)}`
}

console.log(formatNumber(1234567));  // "1,234,567"
console.log(formatNumber(1000));     // "1,000"