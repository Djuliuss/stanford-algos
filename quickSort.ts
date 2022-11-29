// export const quickSort = (arr: number[]) => {
//   return arr.sort();
// };

import { NumberObject, selectPivot } from "./types";
import { swap } from "./utils";

// console.info(quickSort([5, 1, 7, 2, 4]));
let GLOBAL_ARRAY: NumberObject[] = [];

export const initialiseGlobalArray = (arr: NumberObject[]) => {
  GLOBAL_ARRAY = arr;
};

const stringifyNumbers = (arr: NumberObject[]) =>
  arr.map(({ number }) => number).toString();

export const quickSort = (arr: NumberObject[]) => {
  const copyInputArray = stringifyNumbers(arr);
  const length = arr.length;
  if (length === 1) {
    return;
  }
  // const pivotIndex = selectPivot(firstElement, arr);
  const partitionIndex = partitionArray(arr);
  const copyArrayAfterPartition = stringifyNumbers(arr);

  let [copyLeftArray, copyLeftArrayAfterRecursivecall] = ["", ""];
  if (partitionIndex > 0) {
    const leftArray: NumberObject[] = arr.slice(0, partitionIndex);
    copyLeftArray = stringifyNumbers(leftArray);
    quickSort(leftArray);
    copyLeftArrayAfterRecursivecall = stringifyNumbers(leftArray);
  }

  let [copyRightArray, copyRightArrayAfterRecursivecall] = ["", ""];
  if (partitionIndex < arr.length - 1) {
    const rightArray: NumberObject[] = arr.slice(partitionIndex + 1);
    copyRightArray = stringifyNumbers(rightArray);
    quickSort(rightArray);
    copyRightArrayAfterRecursivecall = stringifyNumbers(rightArray);
  }

  const copyOutputArray = stringifyNumbers(arr);
  // console.info(
  //   `EXITING EXECUTION *******
  //   copyInputArray: ${copyInputArray}
  //   copyArrayAfterPartition: ${copyArrayAfterPartition}
  //   copyLeftArray: ${copyLeftArray}
  //   copyLeftArrayAfterRecursiveCall: ${copyLeftArrayAfterRecursivecall}
  //   copyRightArray ${copyRightArray}
  //   copyRightArrayAFterRecursiveCall ${copyRightArrayAfterRecursivecall}
  //   copyOutputArray: ${copyOutputArray}
  //   *******`
  // );
};

export function partitionArray(arr: NumberObject[]) {
  // JD!!!
  // for now hardcoding
  const arrayToBePartioned = stringifyNumbers(arr);
  const globalBeforePartioned = stringifyNumbers(GLOBAL_ARRAY);

  // console.info(
  //   `about to partioned array ${arrayToBePartioned} when global is ${globalBeforePartioned}`
  // );

  const pivotIndex = 0;

  if (pivotIndex !== 0) {
    swap(arr, 0, pivotIndex);
  }
  const pivot = arr[pivotIndex];
  let [i, j] = [1, 1];
  while (j <= arr.length - 1) {
    if (arr[j].number < pivot.number) {
      swap(arr, i, j);
      i++;
    }
    j++;
  }
  swap(arr, i - 1, pivotIndex);

  const arrayAfterPartioned = stringifyNumbers(arr);
  const globarlAfterPartioned = stringifyNumbers(GLOBAL_ARRAY);

  // console.info(
  //   `partioned finished array ${arrayAfterPartioned} when global is ${globarlAfterPartioned}`
  // );
  return i - 1;
}
