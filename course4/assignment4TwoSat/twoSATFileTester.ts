import { getTwoSatFromFile } from "./twoSAT";

const nReadlines = require("n-readlines");
const testFileNames = [
  "1_2",
  "2_2",
  "3_4",
  "4_4",
  "5_8",
  "6_8",
  "7_10",
  "8_10",
  "9_20",
  "10_20",
  "11_40",
  "12_40",
  "13_80",
  "14_80",
  "15_100",
  "16_100",
  "17_200",
  "18_200",
  "19_400",
  "20_400",
  "21_800",
  "22_800",
  // "23_1000",
  // "24_1000",
  // "25_2000",
  // "26_2000",
  // "27_4000",
  // "28_4000",
  // "29_8000",
  // "30_8000",
  // "31_10000",
  // "32_10000",
  // "33_20000",
  // "34_20000",
  // "35_40000",
  // "36_40000",
  // "37_80000",
  // "38_80000",
  // "39_100000",
  // "40_100000",
];

(async () => {
  console.time("test");
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course4/assignment4TwoSat/testCases/input_beaunus_${testFileName}.txt`;
    const outputFile = `./course4/assignment4TwoSat/testCases/output_beaunus_${testFileName}.txt`;
    const response = await getTwoSatFromFile(inputFile);
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
