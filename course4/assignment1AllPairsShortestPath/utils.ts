import { Graph, INFINITY } from "./types";

export const getLengthBetweenVertices = (
  graph: Graph,
  tail: number,
  head: number
) => {
  const edges = graph[tail];
  const edge = edges.find(({ head: headEdge }) => headEdge === head);
  return edge?.length ?? INFINITY;
};
