import { calculateClustersAndGetMaxSpacingFromFile } from "./cluster";

const nReadlines = require("n-readlines");
// JD!!!
// try example by RobinPercy here https://www.coursera.org/learn/algorithms-greedy/discussions/weeks/2/threads/yqY_qtLCEeaBeg5U4yHl7A
const testFileNames = [
  "0_1",
  // "1_8",
  // "2_8",
  // "3_8",
  // "4_8",
  // "5_16",
  // "6_16",
  // "7_16",
  // "8_16",
  // "9_32",
  // "10_32",
  // "11_32",
  // "12_32",
  // "13_64",
  // "14_64",
  // "15_64",
  // "16_64",
  // "17_128",
  // "18_128",
  // "19_128",
  // "20_128",
  // "21_256",
  // "22_256",
  // "23_256",
  // "24_256",
  // "25_512",
  // "26_512",
  // "27_512",
  // "28_512",
  // "29_1024",
  // "30_1024",
  // "31_1024",
  // "32_1024",
];

(async () => {
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course3/assignment2Clustering/testCases/question1/input_completeRandom_${testFileName}.txt`;
    const outputFile = `./course3/assignment2Clustering/testCases/question1/output_completeRandom_${testFileName}.txt`;
    const numberofClusters = 2;
    const response = await calculateClustersAndGetMaxSpacingFromFile(
      inputFile,
      4
    );
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
