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

let nodeMap: Map<string, number> = new Map();
let flags = new Map();

export const addNodesToMap = (nodes: string[]) => {
  nodeMap = new Map();
  flags = new Map();

  nodes.forEach((el, index) => nodeMap.set(el, index + 1));
};

export const calculateEdgesForAllNodes = (nodes: string[], length: number) => {
  const edgesForAllNodes: edge[] = [];

  nodes.forEach((node, index) => {
    edgesForAllNodes.push(...calculateEdgesForNode(node, index + 1, length));
  });
  return edgesForAllNodes;
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
      const concatenation = flags.get(candidate)! + "+" + nodeNumber.toString();
      if (!flags.has(concatenation)) {
        edges.push({
          node1: nodeNumber,
          node2: nodeMap.get(candidate)!,
          cost: 1,
        });
        flags.set(nodeNumber.toString() + "+" + nodeMap.get(candidate)!, true);
      }
    }
  });
  operatorsDistanceTwo.forEach((e) => {
    const candidate = calculatePoint(node, e);
    if (nodeMap.has(candidate)) {
      const concatenation =
        nodeMap.get(candidate)! + "+" + nodeNumber.toString();
      if (!flags.has(concatenation)) {
        edges.push({
          node1: nodeNumber,
          node2: nodeMap.get(candidate)!,
          cost: 2,
        });
        flags.set(nodeNumber.toString() + "+" + nodeMap.get(candidate)!, true);
      }
    }
  });
  return edges;
};
