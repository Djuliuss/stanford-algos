import { processKosarajuOnFile } from "../course1/kosaraju";
import fs from "fs/promises";

const testFileNames = [
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
    // const response = await processKosarajuOnFile(inputFile);
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

async function fetchExpectedResult(filename: string) {
  const data = await fs.readFile(filename, {
    encoding: "utf8",
  });
  const fixedData = data.split("\n");
  const expectedResult = fixedData[0].split(",").map(Number);
  return expectedResult;
}

function identicalArrays(arr1: any[], arr2: any[]) {
  let response = true;
  if (arr1.length !== arr2.length) {
    response = false;
  }
  arr1.forEach((el, index) => {
    if (arr2[index] !== el) {
      response = false;
    }
  });
  return response;
}
