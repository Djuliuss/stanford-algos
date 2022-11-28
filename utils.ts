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

console.info(randomUniqueNum(100, 10));
console.info(randomUniqueNum(100, 10));
console.info(randomUniqueNum(100, 10));
console.info(randomUniqueNum(100, 10));
console.info(randomUniqueNum(100, 10));
console.info(randomUniqueNum(100, 10));
console.info(randomUniqueNum(100, 10));
console.info(randomUniqueNum(100, 10));
