// 1. 匹配 16 进制颜色值
// 要求匹配：#12f3a1，#ffBabd，#FFF；等颜色值字母不区分大小写，且可为3位或者6位
function colorRegex(string) {
  let regex = /#[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/g;
  return string.match(regex);
}
const colorString = "#12f3a1 #ffBabd #FFF #123 #586";
// console.log(colorRegex(colorString)); // [ '#12f3a1', '#ffBabd', 'FFF', '123', '586' ]

// 2. 写一个 JS 正则表达式匹配方法，将 const inputString = '20240920201001' 输出为 2024Y09M20D 20:10:01
function timeFormat(string) {
  // const regex = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g;
  // return string.replace(regex, (match, key) => {
  //   console.log('match', match, key)
  //   // "$1Y$2M$3D $4:$5:$6"
  // });

  // 加上 ^ 和 $ 这两个符号是为了更严格控制匹配范围，防止出现意料之外的情况，比如：它会找到中间那一段数字照样匹配并替换，但这可能不是你想要的。
  // 参考：https://chatgpt.com/share/67f9d725-f97c-8010-a1cb-78f05cb33bd6
  const regex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
  // 或者用 const match = string.match(regex)，然后 match[1] match[2] match[3]
  // console.log(match)
  return string.replace(regex, "$1Y$2M$3D $4:$5:$6");
}
const inputString = "20240920201001";
// console.log(timeFormat(inputString));

// 3. URL 匹配
// http://example.com
// https://www.example.com
// https://www.example.com:443
// https://www.example.com?query=abc&query=abc
// https://www.example.com/?query=abc
// https://www.example.com#myHome
// https://www.example.com?query=abc#section1

// get the { protocol, domain, queryParam, hash }
function getUrl(url) {
  console.time('benchmark duration')
  const urlRegex =
    /^(https?):\/\/([^\/?#:]+)(?::\d+)?(?:\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?/;

  const match = url.match(urlRegex);
  console.log(match)
  const result = match
    ? {
        protocol: match[1] || null,
        domain: match[2] || null,
        queryParam: match[3] || null,
        hash: match[4] || null,
      }
    : null;
  console.timeEnd('benchmark duration')
  return result
}
const testUrls = [
  "http://example.com",
  "https://www.example.com",
  "https://www.example.com:443",
  "https://www.example.com?query=abc&query=abc",
  "https://www.example.com/?query=abc",
  "https://www.example.com#myHome",
  "https://www.example.com?query=abc#section1",
];
console.log(getUrl(testUrls[1]));
// 正则说明：
// ^(https?): 匹配协议 http 或 https
// :\/\/: 匹配 "://"
// ([^\/?#:]+): 匹配域名部分（不包含端口、路径、查询或 hash）
// (?::\d+)?: 可选的端口号（忽略）
// (?:\/[^?#]*)?: 可选的路径（忽略）
// (?:\?([^#]*))?: 匹配 query 参数（? 后的部分）
// (?:#(.*))?: 匹配 hash（# 后的部分）
// 参考：https://chatgpt.com/share/67f9df9a-a364-8010-a150-973f7f1de1aa
