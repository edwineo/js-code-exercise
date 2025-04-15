function Parent (params) {
  this.name = params.name
}

function Child (params) {
  Parent.call(this, params)
  this.age = params.age
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child


// ES6 继承
class Animal {
  constructor (params) {
    this.name = params.name
  }
}

class Person extends Animal {
  constructor (params) {
    super(params)
  }
}