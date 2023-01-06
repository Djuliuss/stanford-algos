import { MedianCalculator } from "./types";
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

export const getSumMedians = async (filename: string) => {
  const numbers = await getNumbersFromFile(filename);
  const medianCalculator = new MedianCalculator();
  numbers.forEach((number) => medianCalculator.addNumber(number));
  const medians = medianCalculator.getMedians();
  const sumMedians = medians.reduce((acc, el) => (acc += el));
  return sumMedians % 10000;
};
