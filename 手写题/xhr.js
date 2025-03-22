// 利用 XMLHttpRequest 手写 AJAX 实现
const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // 创建请求
    xhr.open("GET", url, false);
    // 设置请求头
    xhr.setRequestHeader("Content-Type", "application/json");
    // 接收响应
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    // 这里才是真正发送请求
    xhr.send();
  });
};
