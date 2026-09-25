function deepClone (obj, hash = new WeakMap()) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }

  if (!isObject(obj)) {
    return obj
  }

  if (hash.has(obj)) {
    return hash.get(obj)
  }

  const target = Array.isArray(obj) ? [] : {}
  hash.set(obj, target)

  // 为了拿到 Symbol 属性，所以使用 ownKeys
  Reflect.ownKeys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      target[key] = deepClone(obj[key], hash)
    } else {
      target[key] = obj[key]
    }
  })

  return target
}

function deepClone2 (obj, hash = new WeakMap()) {
  const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null
  }

  if (!isObject(obj)) {
    return obj
  }

  if (hash.has(obj)) {
    return hash.get(obj)
  }

  const target = Array.isArray(obj) ? [] : {}
  hash.set(obj, target)
  Reflect.ownKeys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      target[key] = deepClone2(obj[key], hash)
    } else {
      target[key] = obj[key]
    }
  })

  return target
}

const obj1 = {
  a: 1,
  b: {
    a: 2,
    c: 3,
  }
};
const obj2 = deepClone(obj1);
console.log(obj2);