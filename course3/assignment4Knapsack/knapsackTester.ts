import { knapsack, knapsackFromFile } from "./knapsack";

const nReadlines = require("n-readlines");
const testFileNames = [
  "1_4_4",
  "2_4_4",
  "3_4_4",
  "4_4_4",
  "5_10_10",
  "6_10_10",
  "7_10_10",
  "8_10_10",
  "9_100_10",
  "10_100_10",
  "11_100_10",
  "12_100_10",
  "13_100_100",
  "14_100_100",
  "15_100_100",
  "16_100_100",
  "17_100_1000",
  "18_100_1000",
  "19_100_1000",
  "20_100_1000",
  "21_1000_100",
  "22_1000_100",
  "23_1000_100",
  "24_1000_100",
  "25_1000_1000",
  "26_1000_1000",
  "27_1000_1000",
  "28_1000_1000",
  "29_10000_1000",
  "30_10000_1000",
  "31_10000_1000",
  "32_10000_1000",
  "33_100000_2000",
  "34_100000_2000",
  "35_100000_2000",
  "36_100000_2000",
  "37_1000000_2000",
  "38_1000000_2000",
  "39_1000000_2000",
  "40_1000000_2000",
  "41_2000000_2000",
  "42_2000000_2000",
  "43_2000000_2000",
  "44_2000000_2000",
];

(async () => {
  console.time("test");
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course3/assignment4Knapsack/testCases/input_random_${testFileName}.txt`;
    const outputFile = `./course3/assignment4Knapsack/testCases/output_random_${testFileName}.txt`;
    const response = knapsackFromFile(inputFile);
    const expectedResult = await fetchExpectedResult(outputFile);
    if (response !== expectedResult) {
      console.error(
        `maximumbites test ${testFileName} failed response for test1  ${response} expectedResult ${expectedResult}`
      );
      error++;
    } else {
      console.info(`SUCCESSFUL TEST !!! ${testFileName}`);
      success++;
    }
  }
  console.info(`RESULTS OF TESTS SUCCESS: ${success} ERRORS: ${error}`);
  console.timeEnd("test");
})();

export async function fetchExpectedResult(filename: string) {
  const broadbandLines = new nReadlines(filename);
  let line = broadbandLines.next();
  return Number(line.toString("ascii"));
}
