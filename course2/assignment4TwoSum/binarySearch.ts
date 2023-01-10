const arr = [-3, -1, 4, 7, 9, 11, 14, 22, 26, 28, 36, 45, 67, 78, 88, 99];
export const binarySearch = (arr: number[] = [], num: number) => {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (num == arr[mid]) {
      return mid;
    } else if (num < arr[mid]) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return l;
};
// console.log(binarySearch(arr, 22));
console.log(binarySearch(arr, -4));
// console.log(binarySearch(arr, 11));
