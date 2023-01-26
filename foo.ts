const sumItems2 = (frequencies: number[], i: number, j: number) =>
  frequencies.slice(i, j + 1).reduce((acc, el) => (acc += el));
const items = [1, 2, 3, 4, 5];

console.info(sumItems2(items, 0, 2));
