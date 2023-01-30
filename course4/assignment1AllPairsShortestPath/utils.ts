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

export const identicalArrays = (arr1: any[], arr2: any[]) => {
  let response = true;
  if (arr1.length !== arr2.length) {
    response = false;
  }
  arr1.forEach((el, index) => {
    if (arr2[index] !== el) {
      response = false;
    }
  });
  return response;
};
