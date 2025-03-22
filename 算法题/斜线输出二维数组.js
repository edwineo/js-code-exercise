const data = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11,12,13, 14, 15],
  [16,17, 18, 19, 20],
];

function handlePrint (data) {
  const rows = data.length; // 行数
  const cols = data[0].length; // 列数

  for (let line = 0; line < rows + cols - 1; line++) {
    let startRow = Math.max(0, line - cols + 1);
    let printCount = Math.min(line + 1, rows - startRow);
    // console.log(startRow, printCount)

    for (let i = 0; i < printCount; i++) {
      const x = startRow + i;
      const y = line - x;
      console.log(data[x][y])
    }
  }
}

handlePrint(data)

