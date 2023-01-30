import { identicalArrays } from "../../course2/dijkstra/utils";
import { floydWarshall } from "./allPairsShortestPatheeee";
import { Graph } from "./types";

const testData1: Graph = {
  1: [
    { head: 2, length: 2 },
    { head: 3, length: 5 },
  ],
  2: [{ head: 3, length: 1 }],
  3: [{ head: 4, length: 3 }],
  4: [{ head: 1, length: 4 }],
};

const expectedResponse1 = [
  [0, 2, 3, 6],
  [8, 0, 1, 4],
  [7, 9, 0, 3],
  [4, 6, 7, 0],
];

const testData2: Graph = {
  1: [
    { head: 2, length: 2 },
    { head: 3, length: 5 },
  ],
  2: [{ head: 3, length: 1 }],
  3: [{ head: 4, length: -3 }],
  4: [{ head: 1, length: -4 }],
};

const expectedResponse2 = [
  [-4, -2, -1, -4],
  [-6, -4, -3, -6],
  [-7, -5, -4, -7],
  [-8, -6, -5, -8],
];

const testSet: Array<{ testData: Graph; expectedResponse: number[][] }> = [
  { testData: testData1, expectedResponse: expectedResponse1 },
  { testData: testData2, expectedResponse: expectedResponse2 },
];

testSet.forEach(({ testData, expectedResponse }) => {
  const response = floydWarshall(testData);
  response.forEach((_, index) => {
    if (!identicalArrays(expectedResponse[index], response[index])) {
      throw new Error(`test failed`);
    }
  });
});
console.info(`TESTS SUCCESSFUL`);
