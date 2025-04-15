const inputString = '20240920201001'
// Please format the inputString with two solutions and then design a benchmark test to compare the two solutions' performance.

/* input:
1. the format of inputString is correct, no verification is required; 
2. it means the length of the inputString still is 14.
*/

/* expected output: 
2024Y09M20D 20:10:01
*/

// solution one:
function format1(str) {
    const year = str.slice(0, 4)
    const rest = str.slice(4)

    const len = rest.length
    const list = []
    let cur = ''
    for (let i = 0; i < len; i++) {
      if (i % 2 === 0) {
        cur = cur + rest[i]
      } else {
        cur = cur + rest[i]
        list.push(cur)
        cur = ''
      }
    }
    const [month, day, hour, minute, second] = list
    return `${year}Y${month}M${day}D ${hour}:${minute}:${second}`
}
// solution two:
function format2(str) {
    // return `${str.slice(0, 4)}Y${str.slice(4, 6)}M${str.slice(6, 8)}D ${str.slice(8, 10)}:${str.slice(10, 12)}:${str.slice(12)}`
    const regex = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
    const matches = str.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g)
    console.log(matches)
}

console.log(format1(inputString));
console.log(format2(inputString))

// benchmark test
// You need to design a benchmark to compare the performance of the two solutions.
function benchmark() {
  const start1 = Date.now()
  console.log(format1(inputString));
  const end1 = Date.now()
  console.log(`benchmark1 is ${end1 - start1}`)

  const start2 = Date.now()
  console.log(format2(inputString));
  const end2 = Date.now()
  console.log(`benchmark1 is ${end2 - start2}`)
}

benchmark();
