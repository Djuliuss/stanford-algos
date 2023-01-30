import BigNumber from "bignumber.js";

const sumItems = (frequencies: number[], i: number, j: number) => {
  const slice =
    j === frequencies.length
      ? frequencies.slice(i)
      : frequencies.slice(i, j + 1);
  return slice.reduce((acc, el) => (acc += el));
};

const sumItemsBn = (frequencies: BigNumber[], i: number, j: number) => {
  const slice =
    j === frequencies.length
      ? frequencies.slice(i)
      : frequencies.slice(i, j + 1);
  return slice.reduce((acc, el) => acc.plus(el), new BigNumber(0));
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
  // console.info(`when i is ${i} and j is ${j} then min is ${min}`);
  return min;
};

const bstBN = (frequencies: BigNumber[], i: number, j: number): BigNumber => {
  if (i === j) {
    return frequencies[i];
  }
  let min = new BigNumber(999999999);
  for (let r = i; r <= j; r++) {
    const sum0 = sumItemsBn(frequencies, i, j);
    const sum1 = i > r - 1 ? 0 : bstBN(frequencies, i, r - 1);
    const sum2 = r + 1 > j ? 0 : bstBN(frequencies, r + 1, j);
    const sum = sum0.plus(sum1).plus(sum2);
    min = sum.isLessThan(min) ? sum : min;
  }
  return min;
};

const values = [0.2, 0.05, 0.17, 0.1, 0.2, 0.03, 0.25];
// const values = [0.03, 0.05, 0.1, 0.17, 0.2, 0.2, 0.25];
// const values = [20, 5, 17, 10, 20, 3, 25];
// const values = [3, 5, 10, 17, 20, 20, 25];
// const values2 = values.sort((a, b) => a - b);
// const bnNumbers = values.map((e) => new BigNumber(e));
const response = bst(values, 0, values.length - 1);

// const response = bstBN(bnNumbers, 0, values.length - 1);
console.error(
  `JD!!! bst.ts 21. The value of response is ${JSON.stringify(
    response.toString(),
    null,
    2
  )} `
);

// console.info(values.reduce((acc, el) => (acc += el)));
