// 使用 WeakMap 创建一个哈希表来记录完全相同的引用，节约遍历的时间
function deepClone(obj, memo = new WeakMap()) {
  const isObject = () => {
    return typeof obj === "object" && typeof obj !== null;
  };

  if (!isObject(obj)) {
    // 递归终点，开始回溯
    return obj;
  }

  if (memo.has(obj)) {
    return memo.get(obj);
  }

  // 正式开始递归的深拷贝
  const res = Array.isArray(obj) ? [] : {};
  memo.set(obj, res);
  // 一定要用这个方法，才不会递归到原型上的属性
  Reflect.ownKeys(obj).forEach((key) => {
    const cur = obj[key];
    res[key] = isObject(cur) ? deepClone(cur, memo) : cur;
  });
  return res;
}












// 示例
const obj1 = {
  a: 1,
  b: {
    a: 2,
  },
  c: [1, 2, 3]
};
const obj2 = deepClone(obj1);
console.log(obj1, obj2, obj1 !== obj2);
