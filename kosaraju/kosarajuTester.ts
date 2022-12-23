import { processKosarajuOnFile } from "./kosaraju";
import fs from "fs/promises";
import { identicalArrays } from "./kosarajuUtils";

const testFileNames = [
  "1_8",
  "2_8",
  "3_8",
  "4_8",
  "5_16",
  "6_16",
  "7_16",
  "8_16",
  "9_32",
  "10_32",
  "11_32",
  "12_32",
  "13_64",
  "14_64",
  "15_64",
  "16_64",
  "17_128",
  "18_128",
  "19_128",
  "20_128",
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
];

(async () => {
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./kosaraju/testCases/input_mostlyCycles_${testFileName}.txt`;
    const outputFile = `./kosaraju/testCases/output_mostlyCycles_${testFileName}.txt`;
    const response = await processKosarajuOnFile(inputFile);
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
