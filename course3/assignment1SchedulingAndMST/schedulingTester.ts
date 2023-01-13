import { getCostUsingPrimFromFile } from "./prim";

const nReadlines = require("n-readlines");

const testFileNames = [
  "1_10",
  "2_10",
  "3_10",
  "4_10",
  "5_20",
  "6_20",
  "7_20",
  "8_20",
  "9_40",
  "10_40",
  "11_40",
  "12_40",
  "13_80",
  "14_80",
  "15_80",
  "16_80",
  "17_100",
  "18_100",
  "19_100",
  "20_100",
  "21_200",
  "22_200",
  "23_200",
  "24_200",
  "25_400",
  "26_400",
  "27_400",
  "28_400",
  "29_800",
  "30_800",
  "31_800",
  "32_800",
  "33_1000",
  "34_1000",
  "35_1000",
  "36_1000",
  "37_2000",
  "38_2000",
  "39_2000",
  "40_2000",
  "41_4000",
  "42_4000",
  "43_4000",
  "44_4000",
];

(async () => {
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course3/assignment1SchedulingAndMST/testCases/question3/input_random_${testFileName}.txt`;
    const outputFile = `./course3/assignment1SchedulingAndMST/testCases/question3/output_random_${testFileName}.txt`;
    const response = await getCostUsingPrimFromFile(inputFile);
    const expectedResult = await fetchExpectedResult(outputFile);
    if (response !== expectedResult) {
      console.error(
        `test ${testFileName} failed response for test1 ${response} expectedResult ${expectedResult}`
      );
      error++;
    } else {
      console.info(`SUCCESSFUL TEST 1!!! ${testFileName}`);
      success++;
    }
  }
  console.info(`RESULTS OF TESTS SUCCESS: ${success} ERRORS: ${error}`);
})();

export async function fetchExpectedResult(filename: string) {
  const broadbandLines = new nReadlines(filename);
  const line = broadbandLines.next();
  return Number(line.toString("ascii"));
}
