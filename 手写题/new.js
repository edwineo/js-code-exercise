function myNew(fn, ...args) {
  // 判断参数是否是一个函数
  if (typeof fn !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为调用函数的 prototype 对象
  let obj = Object.create(fn.prototype);
  // 将 this 指向新建的对象 obj，并执行函数
  let res = fn.call(obj, ...args);
  // 判断返回结果
  // 如果返回一个对象或者函数，则返回相对应的值；如果不是，则返回 obj
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}

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


function myNew2 (fn, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError('error')
  }
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  if (res && ['object', 'function'].includes(typeof res)) {
    return res
  }
  return obj
}
