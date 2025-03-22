const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    if (s1 === undefined || s2 === undefined) {
      // 其中有一个没有了，那么则 length 长的那个排在前面
      return arr2.length - arr1.length;
    }
    if (s1 === s2) {
      i++;
      continue;
    }
    return s2 - s1;
  }
});

console.log(arr);
