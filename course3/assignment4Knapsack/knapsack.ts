import { item } from "./types";
const nReadlines = require("n-readlines");

let map: Map<string, number> = new Map();

export const knapsackFromFile = (filename: string) => {
  const items: item[] = [];
  const broadbandLines = new nReadlines(filename);
  let line = broadbandLines.next();
  const [capacity, numberItems] = line.toString("ascii").split(" ");
  while ((line = broadbandLines.next())) {
    const numberFromFile = line.toString("ascii");
    const numberArray = numberFromFile.split(" ");
    if (numberArray.length === 2) {
      items.push({
        value: Number(numberArray[0]),
        size: Number(numberArray[1]),
      });
    }
  }
  map = new Map();
  return knapsack3(items, capacity);
};

export const knapsack = (items: item[], capacity: number) => {
  const length = items.length;
  const a: Array<Array<number>> = [];
  for (let index = 0; index <= length; index++) {
    a[index] = [];
    for (let c = 0; c <= capacity; c++) {
      a[index][c] = 0;
    }
  }
  for (let i = 1; i <= length; i++) {
    for (let c = 0; c <= capacity; c++) {
      const { size, value } = items[i - 1];

      if (size > c) {
        a[i][c] = a[i - 1][c];
      } else {
        a[i][c] = Math.max(a[i - 1][c], a[i - 1][c - size] + value);
      }
    }
  }
  return a[length][capacity];
};

const knapsack2 = (items: item[], capacity: number): number => {
  const length = items.length;
  const { value, size } = items[length - 1];
  if (length === 0) {
    throw new Error(`oops, should not happen`);
  } else if (length === 1) {
    const returning = size <= capacity ? value : 0;
    return returning;
  } else if (size > capacity) {
    const returning = knapsack2(items.slice(0, -1), capacity);
    return returning;
  } else {
    const returning = Math.max(
      knapsack2(items.slice(0, -1), capacity),
      knapsack2(items.slice(0, -1), capacity - size) + value
    );
    return returning;
  }
};

const knapsack3 = (items: item[], capacity: number): number => {
  const length = items.length;
  length % 1000 === 0 &&
    console.error(
      `JD!!! knapsack.ts 70. The value of length is ${JSON.stringify(
        length,
        null,
        2
      )} `
    );

  const { value, size } = items[length - 1];
  if (length === 0) {
    throw new Error(`oops, should not happen`);
  } else if (length === 1) {
    const returning = size <= capacity ? value : 0;
    return returning;
  } else if (size > capacity) {
    const key = (length - 1).toString() + "/" + capacity.toString();
    if (!map.has(key)) {
      map.set(key, knapsack3(items.slice(0, -1), capacity));
    }
    const returning = map.get(key)!;
    return returning;
  } else {
    const key1 = (length - 1).toString() + "/" + capacity.toString();
    if (!map.has(key1)) {
      map.set(key1, knapsack3(items.slice(0, -1), capacity));
    }
    const key2 = (length - 1).toString() + "/" + (capacity - size).toString();
    if (!map.has(key2)) {
      map.set(key2, knapsack3(items.slice(0, -1), capacity - size));
    }
    const returning = Math.max(map.get(key1)!, map.get(key2)! + value);
    return returning;
  }
};

const testData: item[] = [
  { value: 3, size: 4 },
  { value: 2, size: 3 },
  { value: 4, size: 2 },
  { value: 4, size: 3 },
];

// const response = knapsack3(testData, 6);
// console.error(
//   `JD!!! knapsack.ts 31. The value of response is ${JSON.stringify(
//     response,
//     null,
//     2
//   )} `
// );
