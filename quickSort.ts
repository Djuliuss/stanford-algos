// export const quickSort = (arr: number[]) => {
//   return arr.sort();
// };

import { selectPivot } from "./types";
import { swap } from "./utils";

// console.info(quickSort([5, 1, 7, 2, 4]));

export const quickSort = (arr: number[]) => {
  const length = arr.length;
  if (length === 1) {
    return arr;
  }
  const pivotIndex = selectPivot(firstElement, arr);
  const leftArray: number[] = [];
  const rightArray: number[] = [];
};

function firstElement(arr: number[]) {
  return 0;
}

// returns index where leftHand ends
export function partitionArray(arr: number[], pivotIndex: number) {
  if (pivotIndex !== 0) {
    swap(arr, 0, pivotIndex);
  }
  const pivot = arr[pivotIndex];
  let [i, j] = [1, 1];
  while (j <= arr.length - 1) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
    j++;
  }
  return i;
}
