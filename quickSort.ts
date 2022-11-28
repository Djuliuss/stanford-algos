// export const quickSort = (arr: number[]) => {
//   return arr.sort();
// };

import { swap } from "./utils";

export const quickSort = (
  arr: number[],
  indexStart: number,
  indexEnd: number
) => {
  if (indexEnd === indexStart) {
    return;
  }
  const partitionIndex = partitionArray(arr, indexStart, indexEnd);
  quickSort(arr, 0, partitionIndex - 1);
  quickSort(arr, partitionIndex + 1, arr.length - 1);
};

function firstElement(arr: number[]) {
  return 0;
}

// returns pivot final position
export function partitionArray(
  arr: number[],
  indexStart: number,
  indexEnd: number
) {
  // const pivotIndex = selectPivot(firstElement, arr);
  const pivotIndex = 0;
  const pivotIndexAdjusted = pivotIndex + indexStart;

  // if (pivotIndex !== 0) {
  //   swap(arr, 0, pivotIndex);
  // }

  const pivot = arr[pivotIndex];

  let [i, j] = [pivotIndexAdjusted + 1, 1];
  while (j <= indexEnd) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
    j++;
  }
  swap(arr, i - 1, pivotIndexAdjusted);
  return i - 1;
}
