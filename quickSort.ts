// export const quickSort = (arr: number[]) => {
//   return arr.sort();
// };

import { selectPivot } from "./types";
import { swap } from "./utils";

// console.info(quickSort([5, 1, 7, 2, 4]));

// export const quickSort = (arr: number[]) => {
//   const length = arr.length;
//   if (length === 1) {
//     return arr;
//   }
//   // const pivotIndex = selectPivot(firstElement, arr);
//   const partitionIndex = partitionArray(arr, pivotIndex);
//   const leftArray: number[] = arr.slice(1, partitionIndex);
//   const rightArray: number[] = arr.slice(partitionIndex);
//   quickSort(leftArray);
//   quickSort(rightArray);
// };

function firstElement(arr: number[]) {
  return 0;
}

// returns index where leftHand ends
export function partitionArray(arr: number[]) {
  // JD!!!
  // for now hardcoding
  const pivotIndex = 0;

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
  swap(arr, i - 1, pivotIndex);
  return i - 1;
}
