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

const sortAndCountInversions = (numbers: string[]): getInversionsResponse => {
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
  } = sortAndCountInversions(numbers.slice(0, midPoint));
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
  // JD!!! DO
  return {
    sortedNumbers: [],
    numberInversions: 0,
  };
};

(async () => {
  const numbers = await getNumbers();
})();
