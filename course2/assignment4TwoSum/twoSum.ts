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
    if (twoSumCalulator.getTwoSum(index)) {
      counter++;
    }
  }
  return counter;
};
