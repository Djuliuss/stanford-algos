import { calculateWmisFromFile } from "./wis";
import { vortex } from "./types";

const nReadlines = require("n-readlines");
const testFileNames: string[] = [
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
  "29_1000",
  "30_1000",
  "31_1000",
  "32_1000",
  "33_2000",
  "34_2000",
  "35_2000",
  "36_2000",
  "37_4000",
  "38_4000",
  "39_4000",
  "40_4000",
  "41_8000",
  "42_8000",
  "43_8000",
  "44_8000",
  "45_10000",
  "46_10000",
  "47_10000",
  "48_10000",
];

(async () => {
  console.time("test");
  let [error, success] = [0, 0];
  for (const testFileName of testFileNames) {
    const inputFile = `./course3/assignment3HuffmanAndMWIS/testCases/question3/input_random_${testFileName}.txt`;
    const outputFile = `./course3/assignment3HuffmanAndMWIS/testCases/question3/output_random_${testFileName}.txt`;
    const response = await calculateWmisFromFile(inputFile);
    const expectedResult = await fetchExpectedResult(outputFile);
    if (workOutResponse(response) !== expectedResult) {
      console.error(
        `  test ${testFileName} failed. got  ${workOutResponse(
          response
        )} expectedResult ${expectedResult}`
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

export function workOutResponse(vertices: vortex[]) {
  let response = "";
  const verticesToCheck = ["1", "2", "3", "4", "17", "117", "517", "997"];
  verticesToCheck.forEach((vortex) => {
    if (isVortexInResponse(vortex, vertices)) {
      response += "1";
    } else {
      response += "0";
    }
  });
  return response;
}

const isVortexInResponse = (vortexNumberToFind: string, vertices: vortex[]) => {
  const found = vertices.find(
    ({ vortexNumber }) => vortexNumber === vortexNumberToFind
  );
  return !!found;
};

export async function fetchExpectedResult(filename: string) {
  const broadbandLines = new nReadlines(filename);
  let line = broadbandLines.next();
  return line.toString("ascii");
}
