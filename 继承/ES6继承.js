class Animal {
  // 私有变量
  #friends = []

  // 静态方法
  static watch () {
    console.log('watch')
  }

  constructor (options) {
    this.age = options.age
    this.sex = options.sex
    this.testProperties = [1,2,3]
  }
  // 原型方法
  eat (something) {
    console.log("eat:", something)
  }
  // 实例属性
  speak = () => {
    console.log(this.age, 'speak')
  }
}

class Person extends Animal {
  constructor (options) {
    super(options)
    this.name = options.name
  }
  // name = '02'
  eat (something) {
    console.log(this.name, "eat:", something)
  }
  walk () {
    console.log(this.name, "walk")
  }
  run = () => {
    this.walk()
    console.log(this.name, "run")
  }
}

// Person.prototype.name = '02'

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
person.run()
console.log(person.friends)
console.log(animal.friends)
Person.watch() // 静态方法也能继承
Animal.watch()
Person.prototype.eat('rice') // this 指向会变成 Person.prototype，这上面没有 name 属性
Person.prototype.walk()
console.log(Person.prototype)
console.log(Person.prototype.__proto__)
console.log(Person.prototype.__proto__ === Animal.prototype) // true