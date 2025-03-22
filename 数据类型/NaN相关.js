const isNaN = (val) => {
  return Object.is(Number(val), NaN)
}

Number.isNaN = (val) => {
  if (typeof val !== 'number') {
    return false
  }
  return Object.is(val, NaN)
}