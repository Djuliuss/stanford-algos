import { nextTick } from "process";
import { Graph } from "./types";
import {
  extractMinimumDimensionalArray,
  getLengthBetweenVertices,
} from "./utils";
const nReadlines = require("n-readlines");

export const getAllPairsShortestPathFromFile = async (filename: string) => {
  const graph: Graph = {};
  const broadbandLines = new nReadlines(filename);
  // JD!!!
  // ignore first row
  let line = broadbandLines.next();
  const numberVertices = line.toString("ascii").split(" ").map(Number)[0];

  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" "); //  with spaces.
    const [vortex, ...arcFile] = numbersRow;
    const vortexNumber = Number(vortex);
    if (!graph[vortexNumber]) {
      graph[vortexNumber] = [];
    }
    const [head, length] = arcFile.map(Number);
    if (head === vortexNumber && length < 0) {
      return "NULL";
    }
    const edge = graph[vortexNumber].find((e) => e.head === head);
    if (edge) {
      edge.length = length < edge.length ? length : edge.length;
    } else {
      graph[vortexNumber].push({ head, length });
    }
  }
  for (let index = 1; index <= numberVertices; index++) {
    if (!graph[index]) {
      graph[index] = [];
    }
  }
  const responseFloydWarshall =
    getAllParisShortPathsFloydWarshallOptimised(graph);
  return responseFloydWarshall !== null
    ? extractMinimumDimensionalArray(responseFloydWarshall).toString()
    : "NULL";
};

export const getAllParisShortPathsFloydWarshall = (graph: Graph) => {
  const vertices = Object.keys(graph);
  const numberVertices = vertices.length;

  const arrayA = new Array(numberVertices + 1)
    .fill(0)
    .map(() =>
      new Array(numberVertices)
        .fill(0)
        .map(() => new Array(numberVertices).fill(0))
    );
  // base cases k = 0;
  for (let v = 1; v <= numberVertices; v++) {
    for (let w = 1; w <= numberVertices; w++) {
      arrayA[0][v - 1][w - 1] =
        v === w ? 0 : getLengthBetweenVertices(graph, v, w);
    }
  }
  //   systematically solve all problems
  for (let k = 1; k <= numberVertices; k++) {
    for (let v = 1; v <= numberVertices; v++) {
      for (let w = 1; w <= numberVertices; w++) {
        const case1 = arrayA[k - 1][v - 1][w - 1];
        const case2 = arrayA[k - 1][v - 1][k - 1] + arrayA[k - 1][k - 1][w - 1];
        arrayA[k][v - 1][w - 1] = case1 <= case2 ? case1 : case2;
      }
    }
  }
  // check for negative cycle
  let response: number[][] | null = arrayA[numberVertices];
  for (let v = 0; v < numberVertices; v++) {
    if (arrayA[numberVertices][v][v] < 0) {
      response = null;
    }
  }
  return response;
};

// JD!!!
// this function has been tweaked to deal with bigger graphs ( >1000 nodes). It does not keep all the iterations but just the previous one. This is only useful is we are only interested in the final value (and not the paths themselves)
export const getAllParisShortPathsFloydWarshallOptimised = (graph: Graph) => {
  const vertices = Object.keys(graph);
  const numberVertices = vertices.length;

  let previousIteration = new Array(numberVertices)
    .fill(0)
    .map(() => new Array(numberVertices).fill(0));
  // base cases k = 0;
  for (let v = 1; v <= numberVertices; v++) {
    for (let w = 1; w <= numberVertices; w++) {
      previousIteration[v - 1][w - 1] =
        v === w ? 0 : getLengthBetweenVertices(graph, v, w);
    }
  }
  //   systematically solve all problems
  for (let k = 1; k <= numberVertices; k++) {
    k % 100 === 0 && console.info(`iteration ${k}`);
    const nextIteration = new Array(numberVertices)
      .fill(0)
      .map(() => new Array(numberVertices).fill(0));
    for (let v = 1; v <= numberVertices; v++) {
      for (let w = 1; w <= numberVertices; w++) {
        const case1 = previousIteration[v - 1][w - 1];
        const case2 =
          previousIteration[v - 1][k - 1] + previousIteration[k - 1][w - 1];
        nextIteration[v - 1][w - 1] = case1 <= case2 ? case1 : case2;
      }
    }
    previousIteration = [...nextIteration];
  }
  // check for negative cycle
  let response: number[][] | null = previousIteration;
  for (let v = 0; v < numberVertices; v++) {
    if (previousIteration[v][v] < 0) {
      response = null;
    }
  }
  return response;
};
