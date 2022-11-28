import { sortAndCountInversions } from "./numberInversions";
import { partitionArray, quickSort } from "./quickSort";
import { randomUniqueNum } from "./utils";
interface TestCase {
  numbers: string[];
  expectedResult: number;
}

// sortAndCountInversionsTesting();
quickSortTesting();
// testPartitionArray();

function sortAndCountInversionsTesting() {
  const testCase1 = {
    numbers: ["8", "4", "2", "1"],
    expectedResult: 6,
  };
  const testCase2 = {
    numbers: ["1", "20", "6", "4", "5"],
    expectedResult: 5,
  };
  const testCase3 = {
    numbers: ["1", "3", "5", "2", "4", "6"],
    expectedResult: 3,
  };
  const testCase4 = {
    numbers: ["5", "4", "3", "2", "1"],
    expectedResult: 10,
  };
  const testCase5 = {
    numbers: ["1", "2", "3", "4", "5"],
    expectedResult: 0,
  };
  const testCase6 = {
    numbers: ["1", "5", "2", "8", "3", "4"],
    expectedResult: 5,
  };

  const testCase7 = {
    numbers: ["8", "4", "1", "2"],
    expectedResult: 5,
  };
  const testCases: TestCase[] = [
    testCase1,
    testCase2,
    testCase3,
    testCase4,
    testCase5,
    testCase6,
    testCase7,
  ];
  testCases.forEach(({ numbers, expectedResult }) => {
    const obtainedResult = sortAndCountInversions(numbers).numberInversions;
    if (obtainedResult !== expectedResult) {
      console.error(
        `testcase ${numbers} returned invalid result ${obtainedResult}. should have been ${expectedResult}`
      );
    } else {
      console.info(`succesfull value for ${numbers}`);
    }
  });
}

function quickSortTesting() {
  const numberOfTests = 1;
  let test = 1;
  while (test <= numberOfTests) {
    // const testArray = randomUniqueNum(10, 8);
    const testArray = [3, 8, 2, 5, 1, 4, 7, 6];
    quickSort(testArray, 0, testArray.length - 1);
    const jsSort = testArray.sort();
    if (jsSort.length !== testArray.length) {
      // JD!!! improve
      throw new Error("Wrong length");
    }
    for (let i = 0; i < testArray.length; i++) {
      // JD!!! imrpove
      if (testArray[i] !== jsSort[i]) {
        throw new Error("wrong value");
      }
    }
    console.info(`test ${test} sucessful`);
    test++;
  }
}

function testPartitionArray() {
  const numberOfTests = 1000;
  let test = 1;
  while (test <= numberOfTests) {
    const testArray = randomUniqueNum(100, 25);
    // const testArray = [3, 8, 2, 5, 1, 4, 7, 6];
    const pivotFinalPosition = partitionArray(
      testArray,
      0,
      testArray.length - 1
    )!;
    validateArray(testArray, pivotFinalPosition);
    console.info(`Succesfull testing ${test}`);
    test++;
  }
}

function validateArray(arr: number[], pivotPositionAfterPartition: number) {
  const pivotValue = arr[pivotPositionAfterPartition];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (index < pivotPositionAfterPartition) {
      if (element > pivotValue) {
        throw new Error(
          `Value ${element} in position ${index} is higher than ${pivotValue}`
        );
      }
    } else if (index === pivotPositionAfterPartition) {
      // continue
    } else {
      if (element < pivotValue) {
        throw new Error(
          `Value ${element} in position ${index} is lower than ${pivotValue}`
        );
      }
    }
  }
}
