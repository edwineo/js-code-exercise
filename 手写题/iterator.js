// 如何让一个迭代器可以使用 forEach 循环
// 迭代器是不可以使用 forEach 循环的，可以使用 for of 进行遍历。
// 1. 先初始化一个迭代器
// 初始化方式一
const myIterator = {
  data: [1, 2, 3],
  index: 0,
  next() {
    if (this.index < this.data.length) {
      return {
        value: this.data[this.index++],
        done: false
      }
    } else {
      return {
        done: true
      }
    }
  },
  [Symbol.iterator] () {
    return this
  }
}
// 初始化方式二
// const myIterator = [1,2,3][Symbol.iterator]();

// 2. 然后将迭代器转换为数组
// const tempArr = Array.from(myIterator); // 迭代器转换为数组
// tempArr.forEach(element => {
//   console.log(element)
// })
// for (let i of myIterator) {
//   console.log('i', i)
// }



// 如何让 const [name,personality] = {name:'芝士',personality:'creative'} 成立且不报错
const obj = {
  name: '芝士',
  personality: 'creative'
}
Object.prototype[Symbol.iterator] = function () {
  const values = Object.values(this) // 先求出对象上的数组
  return values[Symbol.iterator]() // 然后调用数组上的 Symbol.iterator 方法即可
}
const [name, personality] = obj
console.log(name, personality)


// 手写 Array.from()
// 所以 Array.from() 可以将类数组（类数组是对象）和迭代器（字符串、set、map）转换成数组
function arrayFrom(obj){
  const result = [];
  // 判断是否为迭代器
  if(obj && typeof obj[Symbol.iterator] === 'function' && typeof obj.next === 'function'){
    for (const iterator of obj) {
      result.push(iterator);
    }
    return result;
  }
  // 判断是否为类数组
  if(obj && typeof obj.length === 'number'){
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      result.push(element)
    }
    return result
  }
  // 如果都不是，则返回 []
  return [];
}
console.log(arrayFrom('abcd')); // [ 'a', 'b', 'c', 'd' ]
console.log(arrayFrom(['1',2,3])); // [ '1', 2, 3 ]
const mySet = new Set([1,2,2,2,2]);
console.log(Array.from(mySet)); // [ '1', 2, 3 ]
// 类数组对象
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length:3
}
console.log('类数组', arrayFrom(arrayLike));// 类数组 [ 'a', 'b', 'c' ]

console.log(arrayFrom(myIterator))
