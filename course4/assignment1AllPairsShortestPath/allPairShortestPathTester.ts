import { floydWarshall } from "./allPairsShortestPatheeee";
import { Graph } from "./types";

const inputData1: Graph = {
  1: [
    { head: 2, length: 2 },
    { head: 3, length: 5 },
  ],
  2: [{ head: 3, length: 1 }],
  3: [{ head: 4, length: 3 }],
  4: [{ head: 1, length: 4 }],
};

const response = floydWarshall(inputData1);
console.error(
  `JD!!! allPairShortestPathTester.ts 15. The value of response is ${JSON.stringify(
    response,
    null,
    2
  )} `
);
