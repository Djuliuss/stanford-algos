const getTwoParts2 = (arr: string[], length: number) => {
  // if (arr.length === 1) {
  //   return [["0"], [arr[0]]];
  // }
  // const length = arr.length;
  // const partOne = arr.slice(0, Math.ceil(length / 2));
  // const partTwo = arr.slice(Math.ceil(length / 2));
  const partOne = arr.slice(0, (-1 * length) / 2);
  const partTwo = arr.slice((-1 * length) / 2);
  return [partOne, partTwo];
};

console.info(getTwoParts2(["8", "5", "5", "7", "1", "3"], 6));
