function create (proto, props) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new Error("error");
  }

  const Ctor = function () {}

  Ctor.prototype = proto
  const obj = new Ctor()

  // 支持 props 参数
  if (props) {
    Object.defineProperty(obj, props)
  }

  // 支持空原型
  if (proto === null) {
    Object.setPrototype(obj, null)
  }

  return obj
}

// 1. bject.create常规使用
const person = {
  showName() {
    console.log(this.name);
  },
};
const me = Object.create(person);
const me2 = create(person);

me.name = "前端鲨鱼哥";
me2.name = "前端鲨鱼哥";

me.showName();
me2.showName();