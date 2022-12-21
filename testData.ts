import { DirectedGraph } from "./kosarajuTypes";

export const graph: DirectedGraph = {
  1: [4],
  2: [8],
  3: [6],
  4: [7],
  5: [2],
  6: [9],
  7: [1],
  8: [5, 6],
  9: [7, 3],
};

export const invertedGraph: DirectedGraph = {
  1: [7],
  2: [5],
  3: [9],
  4: [1],
  5: [8],
  6: [3, 8],
  7: [9, 4],
  8: [2],
  9: [6],
};
