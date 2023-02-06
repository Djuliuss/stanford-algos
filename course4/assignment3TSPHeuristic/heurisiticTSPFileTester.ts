import { getHeuristicTspFromFile } from "./heuristicTSP";

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
  "13_10",
  "14_10",
  "15_10",
  "16_10",
  "17_20",
  "18_20",
  "19_20",
  "20_20",
  "21_40",
  "22_40",
  "23_40",
  "24_40",
  "25_80",
  "26_80",
  "27_80",
  "28_80",
  "29_100",
  "30_100",
  "31_100",
  "32_100",
  "33_200",
  "34_200",
  "35_200",
  "36_200",
  "37_400",
  "38_400",
  "39_400",
  "40_400",
  "41_800",
  "42_800",
  "43_800",
  "44_800",
  "45_1000",
  "46_1000",
  "47_1000",
  "48_1000",
  "49_2000",
  "50_2000",
  "51_2000",
  "52_2000",
  "53_4000",
  "54_4000",
  "55_4000",
  "56_4000",
  "57_8000",
  "58_8000",
  "59_8000",
  "60_8000",
  "61_10000",
  "62_10000",
  "63_10000",
  "64_10000",
  "65_20000",
  "66_20000",
  "67_20000",
  "68_20000",
  "69_40000",
  "70_40000",
  "71_40000",
  "72_40000",
];

(async () => {
  console.time("test");
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course4/assignment3TSPHeuristic/testCases/input_simple_${testFileName}.txt`;
    const outputFile = `./course4/assignment3TSPHeuristic/testCases/output_simple_${testFileName}.txt`;
    const response = await getHeuristicTspFromFile(inputFile);
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
