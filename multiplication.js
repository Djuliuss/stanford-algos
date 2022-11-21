"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const karatsuba = (x, y) => {
  const [xArray, yArray] = [[...x], [...y]];
  equalizeLength(xArray, yArray);
  if (xArray.length === 1) {
    return (Number(xArray[0]) * Number(yArray[0])).toString();
  }
  const length = xArray.length % 2 === 0 ? xArray.length : xArray.length - 1;
  const [a, b] = getTwoParts(xArray, length);
  const [c, d] = getTwoParts(yArray, length);
  const ac = karatsuba(a.join(""), c.join(""));
  const bd = karatsuba(b.join(""), d.join(""));
  const aplusBtimesCplusD = karatsuba(
    new bignumber_js_1.default(a.join("")).plus(b.join("")).toFixed(),
    new bignumber_js_1.default(c.join("")).plus(d.join("")).toFixed()
  );
  const midSecondTerm = new bignumber_js_1.default(aplusBtimesCplusD)
    .minus(bd)
    .minus(ac);
  const firstTerm = new bignumber_js_1.default(10).pow(length).times(ac);
  const secondTerm = new bignumber_js_1.default(10)
    .pow(length / 2)
    .times(midSecondTerm);
  const result = firstTerm.plus(secondTerm).plus(bd);
  const response = result.toFixed();
  return response;
};
const getTwoParts = (arr, length) => {
  const partOne = arr.slice(0, (-1 * length) / 2);
  const partTwo = arr.slice((-1 * length) / 2);
  return [partOne, partTwo];
};
console.info(
  karatsuba(
    "3141592653589793238462643383279502884197169399375105820974944592",
    "2718281828459045235360287471352662497757247093699959574966967627"
  )
);
function equalizeLength(arr1, arr2) {
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
