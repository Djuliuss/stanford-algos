import BigNumber from "bignumber.js";

let GLOBAL_X: string[] = [];
let GLOBAL_Y: string[] = [];

const karatsuba = (x: string, y: string): string => {
  // console.info(`x·: ${x} y: ${y}`);
  const xArray = [...x];
  const yArray = [...y];
  [GLOBAL_X, GLOBAL_Y] = [xArray, yArray];
  equalizeLength(xArray, yArray);
  if (xArray.length === 1 && yArray.length === 1) {
    return (Number(xArray[0]) * Number(yArray[0])).toString();
  }
  let length = xArray.length;
  length = length % 2 === 0 ? length : length - 1;
  const [a, b] = getTwoParts(xArray, length);
  const [c, d] = getTwoParts(yArray, length);
  const ac = karatsuba(a.join(""), c.join(""));
  const bd = karatsuba(b.join(""), d.join(""));
  const aplusBtimesCplusD = karatsuba(
    new BigNumber(a.join("")).plus(b.join("")).toFixed(),
    new BigNumber(c.join("")).plus(d.join("")).toFixed()
  );
  // (Number(a.join("")) + Number(b.join(""))).toString(),
  // (Number(c.join("")) + Number(d.join(""))).toString()
  // const secondTerm = Number(aplusBtimesCplusD) - Number(bd) - Number(ac);
  const midSecondTerm = new BigNumber(aplusBtimesCplusD).minus(bd).minus(ac);
  const firstTerm = new BigNumber(10).pow(length).times(ac);
  const secondTerm = new BigNumber(10).pow(length / 2).times(midSecondTerm);
  const result = firstTerm.plus(secondTerm).plus(bd);
  const response = result.toFixed();
  return response;
};

const validateArray = (array: any[]): boolean => {
  return array.every((e) =>
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(e)
  );
};

const getTwoParts = (arr: string[], length: number) => {
  const partOne = arr.slice(0, (-1 * length) / 2);
  const partTwo = arr.slice((-1 * length) / 2);
  if (!validateArray(partOne) || !validateArray(partTwo)) {
    console.error(
      `INVALID NUMBERS arr:${arr}, length: ${length} partOne: ${partOne} partTwo: ${partTwo}`
    );
    throw new Error();
  }
  return [partOne, partTwo];
};
try {
  console.info(
    karatsuba(
      "3141592653589793238462643383279502884197169399375105820974944592",
      "2718281828459045235360287471352662497757247093699959574966967627"
      // karatsuba("5678", "1234")
    )
  );
} catch (e) {
  console.info(`it failed`, JSON.stringify(e));
  console.info(`x: ${GLOBAL_X}`);
  console.info(`y: ${GLOBAL_Y}`);
}
// console.info(
//   karatsuba(
//     "3141592653589793238462643383279502884197169399375105820974944592",
//     "2718281828459045235360287471352662497757247093699959574966967627"
//   )
// );

function equalizeLength(arr1: string[], arr2: string[]) {
  if (arr1.length === arr2.length) {
    // do nothing
  } else if (arr1.length > arr2.length) {
    while (arr1.length > arr2.length) {
      arr2.unshift("0");
    }
  } else {
    while (arr1.length < arr2.length) {
      arr1.unshift("0");
    }
  }
  return;
}
