// 一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看
class LRUCache {
  constructor(capacity) {
    this.secretKey = new Map();
    this.capacity = capacity;
  }
  get(key) {
    if (this.secretKey.has(key)) {
      let tempValue = this.secretKey.get(key);
      this.secretKey.delete(key);
      this.secretKey.set(key, tempValue);
      return tempValue;
    } else {
      return -1;
    }
  }
  put(key, value) {
    if (this.secretKey.has(key)) {
      // key存在，仅修改值
      this.secretKey.delete(key);
      this.secretKey.set(key, value);
    } else if (this.secretKey.size < this.capacity) {
      // key不存在，cache未满
      this.secretKey.set(key, value);
    } else {
      // 添加新key，删除旧key
      this.secretKey.set(key, value);
      // 删除map的第一个元素，即为最长未使用的
      // Map.prototype.keys() 返回一个新的迭代对象，其中包含 Map 对象中所有的键，并以插入 Map 对象的顺序排列，所以 next() 获取到的是最早插入其中的键
      this.secretKey.delete(this.secretKey.keys().next().value);
    }
  }
}

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