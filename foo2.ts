import BigNumber from "bignumber.js";

const first = new BigNumber(
  "2718281828459045235360287471352662497757247093699959574966967627"
);
const second = new BigNumber(
  "3141592653589793238462643383279502884197169399375105820974944592"
);

const mult = first.times(second);
console.info(mult.toFixed());
