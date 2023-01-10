import { TwoSumCalculator } from "./types";
const nReadlines = require("n-readlines");

const getNumbersFromFile = async (filename: string) => {
  const numbers: number[] = [];
  const broadbandLines = new nReadlines(filename);
  let line;
  while ((line = broadbandLines.next())) {
    const numberFromFile = line.toString("ascii");
    if (Number(numberFromFile)) {
      numbers.push(numberFromFile);
    }
  }
  return numbers;
};

export const getTwoSum = async (filename: string) => {
  const numbers = await getNumbersFromFile(filename);
  const twoSumCalulator = new TwoSumCalculator(numbers);
  let counter = 0;
  for (let index = -10000; index <= 10000; index++) {
    index % 1000 === 0 && console.info(`index ${index}`);
    if (twoSumCalulator.getTwoSum(index)) {
      counter++;
    }
  }
  return counter;
};

let sums: { [key: number]: boolean } = {};
export const getTwoSum2 = async (filename: string) => {
  sums = {};
  const numbers = await getNumbersFromFile(filename);
  //   const numbers = [-3, -1, 1, 2, 9, 11, 7, 6, 2];
  const numbersNotDuplicates = [...new Set(numbers)];
  const numbersSorted = numbersNotDuplicates.sort((a, b) => a - b).map(Number);
  console.error(
    `JD!!! twoSum.ts 37. The value of numbersSorted is ${JSON.stringify(
      numbersSorted.length,
      null,
      2
    )} `
  );

  //   const twoSumCalulator = new TwoSumCalculator(numbers);
  let counter = 0;
  let index = 0;
  while (numbersSorted[index] <= 5000) {
    const element = numbersSorted[index];
    index % 1000 === 0 && console.info(`index ${index}`);
    counter += findTargetsInInterval(
      numbersSorted,
      element,
      -10000,
      10000,
      index
    );
    index++;
  }

  return counter;
};

// JD!!!
// numbers needs to be sorted previously
const findTargetsInInterval = (
  numbers: number[],
  x: number,
  limitL: number,
  limitH: number,
  index: number
) => {
  let numberTargets = 0;
  while (numbers[index] < limitL - x) {
    index++;
  }
  while (numbers[index] <= limitH - x) {
    if (numbers[index] !== x && !sums[numbers[index] + x]) {
      numberTargets++;
      sums[numbers[index] + x] = true;
    }
    index++;
  }
  return numberTargets;
};

// (async () => {
//   const response = await getTwoSum2("");
//   console.error(
//     `JD!!! twoSum.ts 77. The value of response is ${JSON.stringify(
//       response,
//       null,
//       2
//     )} `
//   );
// })();
