function isObject (value) {
  return typeof value === 'object' && value !== null
}

function deepClone (obj, hash = new WeakMap()) {
  if (!isObject(obj)) {
    return obj
  }
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  const target = Array.isArray(obj) ? [] : {}
  // 缓存
  hash.set(obj, target)
  // 为了拿到 Symbol 属性，所以使用 ownKeys
  Reflect.ownKeys(obj).forEach(key => {
    // 先将 target 挂载到 hash 上，然后递归 target
    // 所以这里一定要设置 target[key]
    if (isObject(obj[key])) {
      // 递归的深拷贝
      target[key] = deepClone(obj[key], hash)
    } else {
      target[key] = obj[key]
    }
  })
  return target
}

const obj1 = {
  a: 1,
  b: {
    a: 2
  }
};
const obj2 = deepClone(obj1);
obj2.a = 2
console.log(obj1);
console.log(obj2);