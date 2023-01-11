import { sortAndCountInversions } from "../course1/runner";
import { getJobsFromFile, getWeightedCompletedTime } from "./scheduling";
import { sortByDifference, sortByRatio } from "./utils";

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
  "17_160",
  "18_160",
  "19_160",
  "20_160",
  "21_320",
  "22_320",
  "23_320",
  "24_320",
  "25_640",
  "26_640",
  "27_640",
  "28_640",
  "29_1280",
  "30_1280",
  "31_1280",
  "32_1280",
  "33_2560",
  "34_2560",
  "35_2560",
  "36_2560",
  "37_5120",
  "38_5120",
  "39_5120",
  "40_5120",
  "41_10000",
  "42_10000",
  "43_10000",
  "44_10000",
];

(async () => {
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course3/assignment1SchedulingAndMST/testCases/questions1And2/input_random_${testFileName}.txt`;
    const outputFile = `./course3/assignment1SchedulingAndMST/testCases/questions1And2/output_random_${testFileName}.txt`;
    const jobs = await getJobsFromFile(inputFile);
    const response1 = await getWeightedCompletedTime(jobs, sortByDifference);
    const response2 = await getWeightedCompletedTime(jobs, sortByRatio);

    const [expectedResult1, expectedResult2] = await fetchExpectedResult(
      outputFile
    );
    if (response1 !== expectedResult1) {
      console.error(
        `test ${testFileName} failed response for test1 ${response1} expectedResult ${expectedResult1}`
      );
      error++;
    } else {
      console.info(`SUCCESSFUL TEST 1!!! ${testFileName}`);
      success++;
    }
    if (response2 !== expectedResult2) {
      console.error(
        `test ${testFileName} failed response for test2 ${response2} expectedResult ${expectedResult2}`
      );
      error++;
    } else {
      console.info(`SUCCESSFUL TEST 2!!! ${testFileName}`);
      success++;
    }
  }
  console.info(`RESULTS OF TESTS SUCCESS: ${success} ERRORS: ${error}`);
})();

export async function fetchExpectedResult(filename: string) {
  const broadbandLines = new nReadlines(filename);
  let line = broadbandLines.next();
  const response1 = Number(line.toString("ascii"));
  line = broadbandLines.next();
  const response2 = Number(line.toString("ascii"));
  return [response1, response2];
}
