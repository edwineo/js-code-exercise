// 类数组转化为数组的方法有哪些
// 类数组：拥有 length 属性，可以使用下标来访问元素，但是不能使用数组的方法。

const arrayLike = document.querySelectorAll('div');

[...arrayLike]
// 扩展运算符依赖 Symbol.iterator。只有可迭代对象（Iterable）才能使用 ... 展开，
// 而 Array.from 除了支持 Iterable，还支持纯类数组对象，所以兼容性更强。
Array.from(arrayLike)
Array.prototype.slice.call(arrayLike)
Array.apply(null, arrayLike)
Array.prototype.concat.call([], arrayLike)