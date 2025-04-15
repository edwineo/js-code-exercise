class LRUCache {
  constructor (capacity) {
    this.secretKey = new Map()
    this.capacity = capacity
  }

  get (key) {
    if (this.secretKey.has(key)) {
      const target = this.secretKey.get(key)
      this.secretKey.delete(key)
      this.secretKey.set(key, target)
      
      return target
    } else {
      return -1
    }
  }

  put (key, value) {
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
    } else if (this.secretKey.size < this.capacity) {
      // 此时 key 不存在，capacity 未满
      this.secretKey.set(key, value)
    } else {
      // 删除最老旧的 key，添加新的 key
      const oldKey = this.secretKey.keys().next().value
      console.log('oldKey', this.secretKey.keys(), this.secretKey.keys().next().value)
      this.secretKey.delete(oldKey)
      this.secretKey.set(key, value)
    }
  }
}

// 示例
let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log("cache.get(1)", cache.get(1))// 返回  1
cache.put(3, 3);// 该操作会使得密钥 2 作废
console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
cache.put(4, 4);// 该操作会使得密钥 1 作废
console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
console.log("cache.get(3)", cache.get(3))// 返回  3
console.log("cache.get(4)", cache.get(4))// 返回  4
