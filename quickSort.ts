// export const quickSort = (arr: number[]) => {
//   return arr.sort();
// };

import { NumberObject } from "./types";
import { determineMedian, determineMiddle, swap } from "./utils";

// console.info(quickSort([5, 1, 7, 2, 4]));
let GLOBAL_ARRAY: NumberObject[] = [];

export const initialiseGlobalArray = (arr: NumberObject[]) => {
  GLOBAL_ARRAY = arr;
};

const stringifyNumbers = (arr: NumberObject[]) =>
  arr.map(({ number }) => number).toString();

let numberOfComparisons = 0;

export const getNumberOfComparisons = () => numberOfComparisons;

export const addNumberOfComparions = (number: number) =>
  (numberOfComparisons += number);

export const quickSort = (arr: NumberObject[]) => {
  const length = arr.length;
  if (length === 1) {
    return;
  }
  // const pivotIndex = selectPivot(firstElement, arr);
  const partitionIndex = partitionArray(arr);

  if (partitionIndex > 0) {
    const leftArray: NumberObject[] = arr.slice(0, partitionIndex);
    addNumberOfComparions(leftArray.length - 1);
    quickSort(leftArray);
  }

  if (partitionIndex < arr.length - 1) {
    const rightArray: NumberObject[] = arr.slice(partitionIndex + 1);
    addNumberOfComparions(rightArray.length - 1);
    quickSort(rightArray);
  }
};

export function partitionArray(arr: NumberObject[]) {
  // JD!!!
  // for now hardcoding
  // const pivotIndex = 0;
  // const pivotIndex = arr.length - 1;

  const middle = determineMiddle(arr.length);
  const median = determineMedian(
    arr[0].number,
    arr[middle].number,
    arr[arr.length - 1].number
  );
  const pivotIndex = arr.findIndex(({ number }) => number === median);

  if (pivotIndex !== 0) {
    swap(arr, 0, pivotIndex);
  }
  const pivot = arr[0];
  let [i, j] = [1, 1];
  while (j <= arr.length - 1) {
    if (arr[j].number < pivot.number) {
      swap(arr, i, j);
      i++;
    }
    j++;
  }
  swap(arr, i - 1, 0);

  return i - 1;
}
