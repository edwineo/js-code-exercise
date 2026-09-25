// LRU 算法

class LRUCache {
  constructor (capacity) {
    this.secretKey = new Map()
    this.capacity = capacity
  }

  get (key) {
    if (this.secretKey.has(key)) {
      let temp = this.secretKey.get(key)
      this.secretKey.delete(key)
      this.secretKey.set(key, temp)
      return temp
    } else {
      return -1
    }
  }

  put (key, value) {
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
    } else if (this.secretKey.size < this.capacity) {
      this.secretKey.set(key, value)
    } else {
      // 删除最久未使用的
      // Map.prototype.keys() 返回一个新的迭代对象，其中包含 Map 对象中所有的键，并以插入 Map 对象的顺序排列，所以 next() 获取到的是最早插入其中的键
      this.secretKey.delete(this.secretKey.keys().next().value)

      this.secretKey.set(value)
    }
  }
}

class LRUCache2 {
  constructor (capacity) {
    this.capacity = capacity
    this.secretKey = new Map()
  }

  get (key) {
    if (this.secretKey.has(key)) {
      const value = this.secretKey.get(key)
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
      return value
    } else {
      return -1
    }
  }

  put (key, value) {
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
    } else if (this.secretKey.size() < this.capacity) {
      this.secretKey.set(key, value)
    } else {
      this.secretKey.delete(this.secretKey.keys().next().value)
      this.secretKey.set(key, value)
    }
  }
}
