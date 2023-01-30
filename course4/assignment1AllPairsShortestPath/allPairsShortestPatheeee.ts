import { Graph } from "./types";
import { getLengthBetweenVertices } from "./utils";

export const floydWarshall = (graph: Graph) => {
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
  let response;
  for (let v = 0; v < numberVertices; v++) {
    if (arrayA[numberVertices][v][v]) {
      response = null;
    }
  }
  return arrayA[numberVertices];
};
