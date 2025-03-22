// 利用闭包，修改下面的代码，让循环输出的结果依次为 1， 2， 3， 4， 5
for (var i=1; i<=5; i++) {
  const value = i
  setTimeout(function timer() {
    console.log(value);
  }, i*1000);
}
