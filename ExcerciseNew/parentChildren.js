// 寄生组合继承

// function 形式
function Parent (name) {
  this.name = name;
  this.say = () => {
    console.log(111)
  }
}

Parent.prototype.play = () => {
  console.log(222)
}

function Children (name) {
  Parent.call(this, name)
  this.name = name
}

Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children

// class 形式
class Animal {
  #friends = []

  static watch () {
    console.log('watch')
  }

  constructor (option) {
    this.age = option.age
    this.sex = option.sex
  }

  eat (sth) {
    console.log(`eat ${sth}`)
  }
}

class Person extends Animal {
  constructor (option) {
    super(option)
    this.name = option.name
  }

  speak () {
    console.log('speak')
  }
}