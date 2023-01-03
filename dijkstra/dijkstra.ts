import { EdgeSet, Graph, VortexSet } from "./types";
import { getCrossingEdges, getMinDijkstraScoreEdge, INFINITY } from "./utils";

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
      ({ vortexId }) => vortexId === headMinDijkstraScore
    );
    lengths[headMinDijkstraScore - 1] =
      lengths[tailMinDijkstraScore] + minDijkstraScore;
    crossingEdges = getCrossingEdges(graph, setX, setRminusX);
  }
  return lengths;
};
