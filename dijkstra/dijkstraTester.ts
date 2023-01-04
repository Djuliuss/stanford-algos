import { processKosarajuOnFile } from "../course1/kosaraju";
import fs from "fs/promises";
import { identicalArrays } from "./utils";
import { getLengthsThroughDijskstraFromFile } from "./dijkstra";
const nReadlines = require("n-readlines");

const testFileNames = [
  // JD!!!
  //  to run exampleClass example you need to tweak the function and replace the \t with spaces

  // "exampleClass",
  "1_4",
  "2_4",
  "3_4",
  "4_4",
  "5_8",
  "6_8",
  "7_8",
  "8_8",
  "9_16",
  "10_16",
  "11_16",
  "12_16",
  "13_32",
  "14_32",
  "15_32",
  "16_32",
  "17_64",
  "18_64",
  "19_64",
  "20_64",
  "21_128",
  "22_128",
  "23_128",
  "24_128",
  "25_256",
  "26_256",
  "27_256",
  "28_256",
];

(async () => {
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./dijkstra/testCases/input_random_${testFileName}.txt`;
    const outputFile = `./dijkstra/testCases/output_random_${testFileName}.txt`;
    let response = await getLengthsThroughDijskstraFromFile(inputFile);

    if (testFileName === "exampleClass") {
      // continue
    } else {
      response = response.filter((_, index) =>
        [6, 36, 58, 81, 98, 114, 132, 164, 187, 196].includes(index)
      );
    }
    const expectedResult = await fetchExpectedResult(outputFile);
    if (!identicalArrays(response, expectedResult)) {
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

//  return shortest-path distances to the following ten vertices, in order: 7,37,59,82,99,115,133,165,188,197.
export async function fetchExpectedResult(filename: string) {
  const broadbandLines = new nReadlines(filename);
  const line = broadbandLines.next();
  const shortestPaths = line.toString("ascii").split(",").map(Number);
  return shortestPaths;
}
