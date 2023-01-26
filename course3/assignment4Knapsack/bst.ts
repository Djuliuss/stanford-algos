const sumItems = (frequencies: number[], i: number, j: number) => {
  const slice =
    j === frequencies.length
      ? frequencies.slice(i)
      : frequencies.slice(i, j + 1);
  return slice.reduce((acc, el) => (acc += el));
};

const bst = (frequencies: number[], i: number, j: number): number => {
  if (i === j) {
    return frequencies[i];
  }
  let min = 999999999;
  for (let r = i; r <= j; r++) {
    const sum0 = sumItems(frequencies, i, j);
    const sum1 = i > r - 1 ? 0 : bst(frequencies, i, r - 1);
    const sum2 = r + 1 > j ? 0 : bst(frequencies, r + 1, j);
    const sum = sum0 + sum1 + sum2;
    min = sum < min ? sum : min;
  }
  return min;
};
// const values = [0.2, 0.05, 0.17, 0.1, 0.2, 0.03, 0.25];
// const values = [0.8, 0.1, 0.1];
// const values = [0.05, 0.4, 0.08, 0.04, 0.1, 0.1, 0.23];
// const values = [20, 5, 17, 10, 20, 3, 25];
const values = [3, 5, 10, 17, 20, 20, 25];
const values2 = values.sort((a, b) => a - b);
const response = bst(values2, 0, values.length - 1);
console.error(
  `JD!!! bst.ts 21. The value of response is ${JSON.stringify(
    response,
    null,
    2
  )} `
);
// console.info(values.reduce((acc, el) => (acc += el)));
