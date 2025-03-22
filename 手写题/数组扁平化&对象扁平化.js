// 递归实现
function flatter(arr) {
  if (!arr.length) return;
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatter(cur) /* 因为这里可能是多维数组，所以需要递归调用 flatter */] : [...pre, cur]
  }, []);
}
// console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

// 迭代实现
function flatter(arr) {
  if (!arr.length) return;
  while (arr.some(item => Array.isArray(item))) {
    // 只要还有一项是多维的数组，则循环将其 concat，也就展开了
    arr = [].concat(...arr)
  }
  return arr
}

// 对象的 flatten 方法
function isObject(val) {
  return typeof val === "object" && val !== null;
}

function flatten(obj) {
  if (!isObject(obj)) {
    return;
  }
  let res = {};
  const dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let k in cur) {
          dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, "");
  return res;
}
const obj = {
  a: {
    b: 1,
    c: 2,
    d: {e: 5}
  },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}
flatten(obj);
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
