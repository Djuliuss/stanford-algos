const karatsuba = (x: string, y: string): string => {
  const xArray = [...x];
  const yArray = [...y];
  equalizeLength(xArray, yArray);
  if (xArray.length === 1 && yArray.length === 1) {
    return (Number(xArray[0]) * Number(yArray[0])).toString();
  }
  let length = xArray.toString().length;
  length = length % 2 === 0 ? length : length - 1;
  const [a, b] = getTwoParts(xArray, length);
  const [c, d] = getTwoParts(yArray, length);
  const ac = karatsuba(a.join(""), c.join(""));
  const bd = karatsuba(b.join(""), d.join(""));
  const aplusBtimesCplusD = karatsuba(
    (Number(a.join("")) + Number(b.join(""))).toString(),
    (Number(c.join("")) + Number(d.join(""))).toString()
  );
  const secondTerm = Number(aplusBtimesCplusD) - Number(bd) - Number(ac);
  const result =
    10 ** length * Number(ac) +
    10 ** (length / 2) * Number(secondTerm) +
    Number(bd);
  return result.toString();
};

const getTwoParts = (arr: string[], length: number) => {
  const partOne = arr.slice(0, (-1 * length) / 2);
  const partTwo = arr.slice((-1 * length) / 2);
  return [partOne, partTwo];
};

console.info(karatsuba("5678", "1234"));

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
