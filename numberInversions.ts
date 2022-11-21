import fs from "fs/promises";

async function getNumbers() {
  try {
    const data = await fs.readFile("numbers.txt", { encoding: "utf8" });
    const parsedNumbers = data.split("\n");
    parsedNumbers.pop();
    return parsedNumbers;
  } catch (err) {
    console.log(err);
  }
}

interface getInversionsResponse {
  sortedNumbers: string[];
  numberInversions: number;
}

let GLOBAL_NUMBERS: any[] = [];
let numberOfCalls = 0;

const sortAndCountInversions = (numbers: string[]): getInversionsResponse => {
  GLOBAL_NUMBERS = numbers;
  console.info(numberOfCalls++);
  if ([0, 1].includes(numbers.length)) {
    return {
      sortedNumbers: numbers,
      numberInversions: 0,
    };
  }
  const midPoint = Math.floor(numbers.length / 2);
  const {
    numberInversions: leftNumberInversions,
    sortedNumbers: leftSortedNumbers,
  } = sortAndCountInversions(numbers.slice(0, midPoint));
  const {
    numberInversions: rightNumberInversions,
    sortedNumbers: rightSortedNumbers,
  } = sortAndCountInversions(numbers.slice(midPoint));
  const { sortedNumbers, numberInversions: splitNumberInversions } =
    mergeAndCountSplitInversions(leftSortedNumbers, rightSortedNumbers);
  return {
    sortedNumbers,
    numberInversions:
      leftNumberInversions + rightNumberInversions + splitNumberInversions,
  };
};

const mergeAndCountSplitInversions = (
  rightNumbers: string[],
  leftNumbers: string[]
): getInversionsResponse => {
  let [i, j, k, splitInversions] = [0, 0, 0, 0];
  const sortedNumbers: string[] = [];
  while (i <= rightNumbers.length - 1 || j <= leftNumbers.length - 1) {
    if (Number(rightNumbers[i]) < Number(leftNumbers[j])) {
      sortedNumbers[k] = rightNumbers[i];
      i++;
    } else {
      sortedNumbers[k] = leftNumbers[j];
      j++;
      splitInversions += Math.floor(rightNumbers.length - i);
    }
    k++;
  }

  return {
    sortedNumbers,
    numberInversions: splitInversions,
  };
};

(async () => {
  const numbers = await getNumbers();
  const numbersFixed = numbers?.map((e) => Number(e).toString());
  try {
    console.error("JD!!! I AM HERE at numberInversions.ts 74");

    const response = sortAndCountInversions(numbersFixed!);
    console.info(`number of inversion is ${response.numberInversions}`);
  } catch (e) {
    console.info(`I got this far: ${GLOBAL_NUMBERS}`);
  }
})();

// const arr1 = ["29"];
// const arr2 = ["25", "60"];
// const response = mergeAndCountSplitInversions(arr1, arr2);
// console.error(
//   `JD!!! numberInversions.ts 89. The value of response is ${JSON.stringify(
//     response,
//     null,
//     2
//   )} `
// );
