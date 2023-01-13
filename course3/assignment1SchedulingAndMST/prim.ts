import { EdgeSet, Graph, VortexSet } from "./types";
import { getCrossingEdges } from "./utils";
const nReadlines = require("n-readlines");

export const getCostUsingPrimFromFile = async (filename: string) => {
  const graph: Graph = {};
  const broadbandLines = new nReadlines(filename);
  broadbandLines.next();
  let line;

  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" ").map(Number);
    const [vortex, ...arcsFile] = numbersRow;
    if (!graph[vortex]) {
      graph[vortex] = [];
    }
    const [vortexId, length] = arcsFile;
    graph[vortex].push({ vortexId, length });
    if (!graph[vortexId]) {
      graph[vortexId] = [];
    }
    graph[vortexId].push({ vortexId: vortex, length });
  }
  return getCostFromPrim(graph);
};

export const getCostFromPrim = (graph: Graph) => {
  const graphVortexIds = Object.keys(graph).map(Number);
  const setX: VortexSet = [];
  let setRminusX: VortexSet = [];
  graphVortexIds.forEach((vortexId, index) => {
    if (index === 0) {
      setX.push({ vortexId });
    } else {
      setRminusX.push({ vortexId });
    }
  });
  let crossingEdges = getCrossingEdges(graph, setX, setRminusX);
  let cost = 0;
  while (crossingEdges.length > 0) {
    const { min, minV } = getSmallestEdge(crossingEdges);
    cost += min;
    setX.push({ vortexId: minV });
    setRminusX = setRminusX.filter(({ vortexId }) => vortexId !== minV);
    crossingEdges = getCrossingEdges(graph, setX, setRminusX);
  }
  return cost;
};

const getSmallestEdge = (edges: EdgeSet) => {
  let min = 999999999999999;
  let minV = 0;
  edges.forEach(({ length, v }) => {
    if (length < min) {
      min = length;
      minV = v;
    }
  });
  return { min, minV };
};
