import { EdgeSet, Graph, VortexSet } from "./types";
import { getCrossingEdges, getMinDijkstraScoreEdge, INFINITY } from "./utils";
const nReadlines = require("n-readlines");

export const getLengthsThroughDijskstraFromFile = async (filename: string) => {
  const graph: Graph = {};
  const broadbandLines = new nReadlines(filename);
  let line;

  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split("\t");
    const [vortex, ...arcsFile] = numbersRow;
    if (!graph[vortex]) {
      graph[vortex] = [];
    }
    arcsFile.forEach((arcFile: any) => {
      const headLength = arcFile.split(",").map(Number);
      graph[vortex].push({ head: headLength[0], length: headLength[1] });
      if (!graph[headLength[0]]) {
        graph[headLength[0]] = [];
      }
    });
  }
  return getLenghtsThroughDijkstra(graph, 1);
};

export const getLenghtsThroughDijkstra = (
  graph: Graph,
  startingVortexId: number
) => {
  const graphVortexIds = Object.keys(graph).map(Number);
  const setX: VortexSet = [];
  let setRminusX: VortexSet = [];
  const lengths: number[] = [];
  graphVortexIds.forEach((vortexId) => {
    if (vortexId === startingVortexId) {
      setX.push({ vortexId });
      lengths[vortexId - 1] = 0;
    } else {
      setRminusX.push({ vortexId });
      lengths[vortexId - 1] = INFINITY;
    }
  });
  let crossingEdges = getCrossingEdges(graph, setX, setRminusX);
  while (crossingEdges.length > 0) {
    const { minDijkstraScore, tailMinDijkstraScore, headMinDijkstraScore } =
      getMinDijkstraScoreEdge(crossingEdges, lengths);
    setX.push({ vortexId: headMinDijkstraScore });
    setRminusX = setRminusX.filter(
      ({ vortexId }) => vortexId !== headMinDijkstraScore
    );
    lengths[headMinDijkstraScore - 1] = minDijkstraScore;
    crossingEdges = getCrossingEdges(graph, setX, setRminusX);
  }
  return lengths;
};
