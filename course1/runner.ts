import fs from "fs/promises";
import {
  addNumberOfComparions,
  getNumberOfComparisons,
  quickSort,
} from "./quickSort";
import { NumberObject } from "./types";

async function getNumbers() {
  try {
    const data = await fs.readFile("numbers.txt", { encoding: "utf8" });
    const parsedNumbers = data.split("\n");
    parsedNumbers.pop();
    return parsedNumbers;
  } catch (err) {
    console.log(err);
  }
}

export async function getNumbersForQuickSort() {
  try {
    const data = await fs.readFile("quickSort.txt", { encoding: "utf8" });
    const parsedNumbers = data.split("\n");
    parsedNumbers.pop();
    return parsedNumbers;
  } catch (err) {
    console.log(err);
  }
}

interface getInversionsResponse {
  sortedNumbers: string[];
  numberInversions: number;
}

export const sortAndCountInversions = (
  numbers: string[]
): getInversionsResponse => {
  if ([0, 1].includes(numbers.length)) {
    return {
      sortedNumbers: numbers,
      numberInversions: 0,
    };
  }
  const midPoint = Math.floor(numbers.length / 2);
  const {
    numberInversions: leftNumberInversions,
    sortedNumbers: leftSortedNumbers,
  } = sortAndCountInversions(numbers.slice(0, midPoint));
  const {
    numberInversions: rightNumberInversions,
    sortedNumbers: rightSortedNumbers,
  } = sortAndCountInversions(numbers.slice(midPoint));
  const { sortedNumbers, numberInversions: splitNumberInversions } =
    mergeAndCountSplitInversions(leftSortedNumbers, rightSortedNumbers);
  return {
    sortedNumbers,
    numberInversions:
      leftNumberInversions + rightNumberInversions + splitNumberInversions,
  };
};

const mergeAndCountSplitInversions = (
  leftSortedNumbers: string[],
  rightSortedNumbers: string[]
): getInversionsResponse => {
  let [i, j, k, splitInversions] = [0, 0, 0, 0];
  const sortedNumbers: string[] = [];
  let [leftFinished, rightFinished] = [false, false];
  while (!leftFinished || !rightFinished) {
    if (
      !leftFinished &&
      (Number(leftSortedNumbers[i]) < Number(rightSortedNumbers[j]) ||
        rightFinished)
    ) {
      sortedNumbers[k] = leftSortedNumbers[i];
      if (i < leftSortedNumbers.length - 1) {
        i++;
      } else {
        leftFinished = true;
      }
    } else if (!rightFinished) {
      sortedNumbers[k] = rightSortedNumbers[j];
      if (j < rightSortedNumbers.length - 1) {
        j++;
      } else {
        rightFinished = true;
      }
      if (!leftFinished) {
        splitInversions += Math.floor(leftSortedNumbers.length - i);
      }
    }
    k++;
  }

  return {
    sortedNumbers,
    numberInversions: splitInversions,
  };
};
// SORT AND COUNT INVERSIONS
// (async () => {
//   const numbers = await getNumbersForQuickSort();

//   const numbersFixed = numbers?.map((e) => Number(e).toString());
//   const response = sortAndCountInversions(numbersFixed!);
//   console.info(`number of inversion is ${response.numberInversions}`);
// })();

// QUICKSORT
(async () => {
  const numbers = await getNumbersForQuickSort();

  const numbersFixed = numbers?.map((e) => Number(e));
  const testArrayObject: NumberObject[] = numbersFixed!.map((e) => ({
    number: e,
  }));
  console.info(`beginning: number of comparisons: ${getNumberOfComparisons()}`);
  addNumberOfComparions(testArrayObject.length - 1);
  quickSort(testArrayObject);
  console.info(`end: number of comparisons: ${getNumberOfComparisons()}`);
})();
