import { getTspFromFile, getTSP } from "./tsp";

const nReadlines = require("n-readlines");
const testFileNames = [
  "1_2",
  "2_2",
  "3_2",
  "4_2",
  "5_3",
  "6_3",
  "7_3",
  "8_3",
  "9_4",
  "10_4",
  "11_4",
  "12_4",
  "13_5",
  "14_5",
  "15_5",
  "16_5",
  "17_6",
  "18_6",
  "19_6",
  "20_6",
  "21_7",
  "22_7",
  "23_7",
  "24_7",
  "25_8",
  "26_8",
  "27_8",
  "28_8",
  "29_9",
  "30_9",
  "31_9",
  "32_9",
  "33_10",
  "34_10",
  "35_10",
  "36_10",
  "37_11",
  "38_11",
  "39_11",
  "40_11",
  "41_12",
  "42_12",
  "43_12",
  "44_12",
  "45_13",
  "46_13",
  "47_13",
  "48_13",
  "49_14",
  "50_14",
  "51_14",
  "52_14",
  "53_15",
  "54_15",
  "55_15",
  "56_15",
  "57_16",
  "58_16",
  "59_16",
  "60_16",
  "61_17",
  "62_17",
  "63_17",
  "64_17",
  "65_18",
  "66_18",
  "67_18",
  "68_18",
  "69_19",
  "70_19",
  "71_19",
  "72_19",
  "73_20",
  "74_20",
  "75_20",
  "76_20",
  "77_21",
  "78_21",
  "79_21",
  "80_21",
  "81_22",
  "82_22",
  "83_22",
  "84_22",
  "85_23",
  "86_23",
  "87_23",
  "88_23",
  "89_24",
  "90_24",
  "91_24",
  "92_24",
];

(async () => {
  console.time("test");
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course4/assignment2TSP/testCases/input_float_${testFileName}.txt`;
    const outputFile = `./course4/assignment2TSP/testCases/output_float_${testFileName}.txt`;
    const response = await getTspFromFile(inputFile);
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
