import { NumberObject } from "./types";

export function randomUniqueNum(range: number, outputCount: number) {
  let arr = [];
  for (let i = 1; i <= range; i++) {
    arr.push(i);
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}

export function swap(arr: NumberObject[], posA: number, posB: number) {
  const temp = arr[posB].number;
  arr[posB].number = arr[posA].number;
  arr[posA].number = temp;
}

export const determineMiddle = (length: number) =>
  length % 2 === 0 ? length / 2 - 1 : Math.floor(length / 2);

export const determineMedian = (a: number, b: number, c: number) =>
  [a, b, c].sort((a, b) => a - b)[1];
