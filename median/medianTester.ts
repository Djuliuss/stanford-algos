import { processKosarajuOnFile } from "../course1/kosaraju";
import fs from "fs/promises";
import { identicalArrays } from "../dijkstra/utils";
import { getLengthsThroughDijskstraFromFile } from "../dijkstra/dijkstra";
const nReadlines = require("n-readlines");

const testFileNames = [
  "1_10",
  // "2_10",
  // "3_10",
  // "4_10",
  // "5_20",
  // "6_20",
  // "7_20",
  // "8_20",
  // "9_40",
  // "10_40",
  // "11_40",
  // "12_40",
  // "13_80",
  // "14_80",
  // "15_80",
  // "16_80",
  // "17_160",
  // "18_160",
  // "19_160",
  // "20_160",
  // "21_320",
  // "22_320",
  // "23_320",
  // "24_640",
  // "25_640",
  // "26_640",
  // "27_640",
  // "28_640",
  // "29_1280",
  // "30_1280",
  // "31_1280",
  // "32_1280",
  // "33_2560",
  // "34_2560",
  // "35_2560",
  // "36_2560",
  // "37_5120",
  // "38_5120",
  // "39_5120",
  // "40_5120",
  // "41_10000",
  // "42_10000",
  // "43_10000",
  // "44_10000",
];

(async () => {
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./median/testCases/input_random_${testFileName}.txt`;
    const outputFile = `./median/testCases/output_random_${testFileName}.txt`;
    // JD!!!
    // uncomment when ready
    // const response = await getLengthsThroughDijskstraFromFile(inputFile);
    const response = 53;

    const expectedResult = await fetchExpectedResult(outputFile);
    if (response !== expectedResult) {
      console.error(
        `test ${testFileName} failed response ${response} expectedResult ${expectedResult}`
      );
      error++;
    } else {
      console.info(`SUCCESSFUL TEST!!! ${testFileName}`);
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
