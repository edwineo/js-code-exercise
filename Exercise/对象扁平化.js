// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: {e: 5}
//   },
//   b: [1, 3, {a: 2, b: 3}],
//   c: 3
// }

// flatten(obj) 结果返回如下
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

const isObjectOrArray = (obj) => {
  return typeof obj === "object" && obj !== null;
};

function flattenObj(obj) {
  // 判断是对象或数组，才进入递归
  if (!isObjectOrArray(obj)) {
    return;
  }

  const res = {};

  const dfs = (cur, prefix) => {
    if (!isObjectOrArray(cur)) {
      // 此时到达叶子节点，开始回溯
      res[prefix] = cur;
      return;
    }
    // 还未到叶子节点，持续递归
    // 分两种情况
    if (Array.isArray(cur)) {
      // 数组
      cur.forEach((item, index) => dfs(item, `${prefix}[${index}]`)); // 同级的话写 prefix，有子级的话继续递归
    } else {
      // 对象
      for (let key in cur) {
        dfs(cur[key], `${prefix}${prefix ? "." : ""}${key}`);
      }
    }
  };

  dfs(obj, "");
  return res;
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};

console.log(flattenObj(obj));
