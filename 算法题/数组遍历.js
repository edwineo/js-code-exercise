/**
 * 生成单个正负整数
 * @returns 
 */
const makeOneRandomNum = () => {
  const random = Math.random();
  const plusOrMinus = random < 0.5 ? -random : random;
  return parseInt(plusOrMinus * 10000);
}

/**
 * 生成任意多个随机正负整数
 * @returns 
 */
const makeAnyRandomNum = (count = 10) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(makeOneRandomNum());
  }
  return list;
}

/**
 * for 循环去除所有负数
 * @returns 
 */
const removeMinusNumbers1 = (numbers) => {
  const numbersCopy = [...numbers];
  const newArr = []
  for (let i = 0; i < numbersCopy.length; i++) {
    if (numbersCopy[i] >= 0) {
      newArr.push(numbersCopy[i])
    }
  }
  return newArr
}

/**
 * forEach 循环去除所有负数
 * @returns 
 */
const removeMinusNumbers2 = (numbers) => {
  const numbersCopy = [...numbers];
  const newArr = []
  numbersCopy.forEach(item => {
    if (item >= 0) {
      newArr.push(item)
    }
  })
  return newArr
}

const main = () => {
  console.time('生成100w正负随机整数耗时');
  const randomNumList = makeAnyRandomNum(1000000);
  console.timeEnd('生成100w正负随机整数耗时');

  console.log('------------------------------------------------')

  console.time('去除负数---for循环---耗时');
  const result1 = removeMinusNumbers1(randomNumList)
  console.timeEnd('去除负数---for循环---耗时');

  console.log('------------------------------------------------')

  console.time('去除负数---forEach---耗时');
  const result2 = removeMinusNumbers2(randomNumList)
  console.timeEnd('去除负数---forEach---耗时');

  // console.log('------------------------------------------------')

  // console.time('去除负数---map---耗时');
  // const result3 = removeMinusNumbers3(randomNumList)
  // console.timeEnd('去除负数---map---耗时');

  // console.log('------------------------------------------------')

  // console.time('去除负数---filter---耗时');
  // const result4 = removeMinusNumbers4(randomNumList)
  // console.timeEnd('去除负数---filter---耗时');

  // console.log('------------------------------------------------')

  // console.time('去除负数---排序二分法---耗时');
  // const result7 = removeMinusNumbers5(randomNumList)
  // console.timeEnd('去除负数---排序二分法---耗时');

  // console.log('------------------------------------------------')

  console.log('result1:', result1);
  console.log('result2:', result2);
  // console.log('result3:', result3);
  // console.log('result4:', result4);
  // console.log('result5:', result5);
}

main();
