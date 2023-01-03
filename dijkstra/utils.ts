import { graph } from "../course1/testData";
import { EdgeSet, EdgeVortex, Graph, VortexSet } from "./types";
const nReadlines = require("n-readlines");

export const getGraphFromFile = (filename: string) => {
  const graph: Graph = {};
  const broadbandLines = new nReadlines(filename);
  let line;
  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" ");
    const [vortexId, ...arcs] = numbersRow;
    arcs.forEach((arcFile: any) => {
      const [arcHead, arcLength] = arcFile.split(",");
      const arc: EdgeVortex = {
        head: arcHead,
        length: arcLength,
      };
      if (graph[vortexId]) {
        graph[vortexId].push(arc);
      } else {
        graph[vortexId] = [arc];
      }
      if (!graph[arcHead]) {
        graph[arcHead] = [];
      }
    });
  }
  return graph;
};

export const getCrossingEdges = (
  graph: Graph,
  setX: VortexSet,
  setVminusX: VortexSet
): EdgeSet => {
  const crossingEdges: EdgeSet = [];
  const vortexIdsetVminusX = setVminusX.map(({ vortexId }) => vortexId);
  for (const vortexX of setX) {
    const { vortexId } = vortexX;
    const edgesVortexX = graph[vortexId];
    for (const edgeVorteX of edgesVortexX) {
      const { head, length } = edgeVorteX;
      if (vortexIdsetVminusX.includes(head)) {
        crossingEdges.push({ head, tail: vortexId, length });
      }
    }
  }
  return crossingEdges;
};

export const getMinDijkstraScoreEdge = (edges: EdgeSet, lengths: number[]) => {
  let minDijkstraScore = 999999999999999999;
  let tailMinDijkstraScore = undefined;
  let headMinDijkstraScore = undefined;
  edges.forEach(({ head, tail, length }) => {
    const dijkstraScore = lengths[head - 1] + length;
    if (dijkstraScore < minDijkstraScore) {
      minDijkstraScore = dijkstraScore;
      tailMinDijkstraScore = tail;
      headMinDijkstraScore = head;
    }
  });
  return { minDijkstraScore, tailMinDijkstraScore, headMinDijkstraScore };
};
