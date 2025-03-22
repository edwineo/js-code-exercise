function Animal (options) {
  // 实例属性及方法
  this.age = options.age
  this.sex = options.sex
  this.testProperties = [1,2,3]
  this.speak = () => {
    console.log(options.speak)
  }
}check// 原型方法
Animal.prototype.eat = (something) => {
  console.log("eat:", something)
}
Animal.watch = function () {
  console.log('watch')
}
function Person (options) {
  // 1. 调用父类构造函数
  Animal.call(this, options)
  this.name = options.name
}
// 2. 继承原型
Person.prototype = Object.create(Animal.prototype)
// 3. 将原型上的构造函数指向自己
Person.prototype.constructor = Person

// 到这里就结束了

// 重写
Person.prototype.eat = function (something) {
  console.log(this.name, "eat:", something)
}
Person.prototype.walk = function () {
  console.log(this.name, "walk")
}
// Person.prototype.name = '01'
const animal = new Animal({
  age: 1,
  sex: 'girl',
  speak: 'I am animal',
})
const person = new Person({
  age: 25,
  sex: 'boy',
  speak: 'I am people',
  name: 'Edwin'
})
person.testProperties.push(4)
console.log(person.testProperties)
console.log(animal.testProperties)
person.speak()
animal.speak()
person.eat('rice')
animal.eat('meat')
person.walk()
console.log('123')
Animal.watch()
Person.watch()
person.walk() // ES5 无法继承静态属性及方法
Person.prototype.eat('rice') // this 指向会变成 Person.prototype，这上面没有 name 属性
console.log(Person.prototype)
console.log(Person.prototype.__proto__)
console.log(Person.prototype.__proto__ === Animal.prototype) // true