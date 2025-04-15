// 手写 new 操作符实现

// 执行过程
// 1. 创建一个新的空对象
// 2. 设置原型，将这个对象的原型指向调用它的函数的 prototype 对象
// 3. 将函数的 this 指向这个对象，执行传入的构造函数内容，给新对象添加属性
// 4. 判断返回的值：如果是引用类型，就直接返回这个引用类型；如果是值类型，就返回刚创建的对象

function myNew (fn, ...args) {
  if (typeof fn !== 'function') {
    console.error('error')
    return
  }

  // 设置原型
  const obj = Object.create(fn.prototype)

  // this 指向 obj，并且执行 fn，获取返回值
  let res = fn.call(obj, ...args)
  // 判断返回的值
  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

function myNew2 (fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('')
  }
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

// 关键点：
// 不能先创建一个 obj，然后再 obj.prototype = Object.create(fn.prototype);
// 因为 obj 是一个普通的空对象，它的原型链是 Object.prototype，与 fn.prototype 无关。
// obj.prototype = Object.create(fn.prototype); 这一步实际上是将 obj 的 prototype 属性（而非它的原型）指向 fn.prototype。
// 在 JavaScript 中，只有函数才有 prototype 属性！！！obj 作为一个普通对象，是没有 prototype 属性的！！！

// obj.prototype = Object.create(fn.prototype);
// 相当于下面代码
// const obj = {}; obj.__proto__ = fn.prototype;


// 示例
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(this.age);
};
let p1 = myNew(Person, "lihua", 18);
console.log(p1.name);
console.log(p1);
p1.say();
