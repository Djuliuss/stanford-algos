import { calculateLargestClusterForDistanceBelowThreeFromFile } from "./cluster";

const nReadlines = require("n-readlines");
const testFileNames = [
  "1_4_14",
  "2_4_10",
  "3_4_8",
  "4_4_6",
  "5_4_4",
  "6_8_12",
  "7_8_10",
  "8_8_8",
  "9_8_6",
  "10_16_18",
  "11_16_16",
  "12_16_14",
  "13_16_12",
  "14_16_10",
  "15_16_8",
  "16_32_20",
  "17_32_18",
  "18_32_16",
  "19_32_14",
  "20_32_12",
  "21_32_10",
  "22_32_8",
  "23_64_22",
  "24_64_20",
  "25_64_18",
  "26_64_16",
  "27_64_14",
  "28_64_12",
  "29_64_10",
  "30_128_24",
  "31_128_22",
  "32_128_20",
  "33_128_18",
  "34_128_16",
  "35_128_14",
  "36_128_12",
  "37_128_10",
  "38_256_24",
  "39_256_22",
  "40_256_20",
  "41_256_18",
  "42_256_16",
  "43_256_14",
  "44_256_12",
  "45_512_24",
  "46_512_22",
  "47_512_20",
  "48_512_18",
  "49_512_16",
  "50_512_14",
  "51_512_12",
  "52_1024_24",
  "53_1024_22",
  "54_1024_20",
  "55_1024_18",
  "56_1024_16",
  "57_1024_14",
  "58_2048_24",
  "59_2048_22",
  "60_2048_20",
  "61_2048_18",
  "62_2048_16",
  "63_4096_24",
  "64_4096_22",
  "65_4096_20",
  "66_4096_18",
  "67_4096_16",
  "68_8192_24",
  "69_8192_22",
  "70_8192_20",
  "71_8192_18",
  "72_16384_24",
  "73_16384_22",
  "74_16384_20",
  "75_16384_18",
  "76_32768_24",
  "77_32768_22",
  "78_32768_20",
  "79_65536_24",
  "80_65536_22",
  // "81_131072_24",
  // "82_131072_22",
  // "83_262144_24",
];

(async () => {
  console.time("test");
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course3/assignment2Clustering/testCases/question2/input_random_${testFileName}.txt`;
    const outputFile = `./course3/assignment2Clustering/testCases/question2/output_random_${testFileName}.txt`;
    const response = await calculateLargestClusterForDistanceBelowThreeFromFile(
      inputFile
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
  console.timeEnd("test");
})();

export async function fetchExpectedResult(filename: string) {
  const broadbandLines = new nReadlines(filename);
  const line = broadbandLines.next();
  return Number(line.toString("ascii"));
}
