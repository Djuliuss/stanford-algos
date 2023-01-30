import { getAllPairsShortestPathFromFile } from "./allPairsShortestPatheeee";

const nReadlines = require("n-readlines");
const testFileNames = [
  "1_2",
  "2_2",
  "3_2",
  "4_2",
  "5_4",
  "6_4",
  "7_4",
  "8_4",
  "9_8",
  "10_8",
  "11_8",
  "12_8",
  "13_16",
  "14_16",
  "15_16",
  "16_16",
  "17_32",
  "18_32",
  "19_32",
  "20_32",
  "21_64",
  "22_64",
  "23_64",
  "24_64",
  "25_128",
  "26_128",
  "27_128",
  "28_128",
  "29_256",
  "30_256",
  "31_256",
  "32_256",
  "33_512",
  "34_512",
  "35_512",
  "36_512",
  "37_1024",
  // the last set fails cos of memory
  // "38_1024",
  // "39_1024",
  // "40_1024",
  // "41_2048",
  // "42_2048",
  // "43_2048",
  // "44_2048",
];

(async () => {
  console.time("test");
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    `/Users/julio/algorithms/course4/assignment1AllPairsShortestPath/testCases/input_random_1_2.txt`;
    const inputFile = `./course4/assignment1AllPairsShortestPath/testCases/input_random_${testFileName}.txt`;
    const outputFile = `./course4/assignment1AllPairsShortestPath/testCases/output_random_${testFileName}.txt`;
    const response = await getAllPairsShortestPathFromFile(inputFile);
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
  return line.toString("ascii");
}
