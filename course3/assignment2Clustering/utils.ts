import {
  getStatesWithOneOne,
  getStatesWithTwoOnes,
  calculatePoint,
} from "./binary";
import { edge, UnionFindArray } from "./types";

export const calculateMaxSpacing = (
  edges: edge[],
  unionFind: UnionFindArray
) => {
  let min = 9999999;
  edges.forEach((edge) => {
    let { node1, node2, cost } = edge;
    let cluster1 = unionFind.find(node1);
    let cluster2 = unionFind.find(node2);
    if (cluster1 !== cluster2) {
      min = cost < min ? cost : min;
    }
  });
  return min;
};

const nodeMap: Map<string, number> = new Map();

export const addNodesToMap = (nodes: string[]) => {
  nodes.forEach((el, index) => nodeMap.set(el, index));
};

export const calculateEdgesForAllNodes = (nodes: string[], length: number) => {
  const edgesForAllNodes: edge[] = [];

  nodes.forEach((node, index) => {
    edgesForAllNodes.push(...calculateEdgesForNode(node, index, length));
  });
};

export const calculateEdgesForNode = (
  node: string,
  nodeNumber: number,
  length: number
) => {
  const edges: edge[] = [];
  const operatorsDistanceOne = [...getStatesWithOneOne(length)];
  const operatorsDistanceTwo = [...getStatesWithTwoOnes(length)];
  operatorsDistanceOne.forEach((e) => {
    const candidate = calculatePoint(node, e);
    if (nodeMap.has(candidate)) {
      edges.push({
        node1: nodeNumber,
        node2: nodeMap.get(candidate)!,
        cost: 1,
      });
    }
  });
  operatorsDistanceTwo.forEach((e) => {
    const candidate = calculatePoint(node, e);
    if (nodeMap.has(candidate)) {
      edges.push({
        node1: nodeNumber,
        node2: nodeMap.get(candidate)!,
        cost: 2,
      });
    }
  });
  return edges;
};
