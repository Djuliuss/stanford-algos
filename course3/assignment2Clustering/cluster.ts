import { edge, UnionFindArray, UnionFindObject } from "./types";
import {
  addNodesToMap,
  calculateShortEdgesForAllNodes,
  calculateMaxSpacing,
} from "./utils";
const nReadlines = require("n-readlines");

export const calculateClustersAndGetMaxSpacingFromFile = (
  filename: string,
  numberClusters: number
) => {
  const edges: edge[] = [];
  const lines = new nReadlines(filename);
  const numberNodes = Number(lines.next().toString("ascii"));
  let line;
  while ((line = lines.next())) {
    const numberFromFile = line.toString("ascii");
    const numberArray = numberFromFile.split(" ");
    if (numberArray.length === 3) {
      edges.push({
        node1: Number(numberArray[0]),
        node2: Number(numberArray[1]),
        cost: Number(numberArray[2]),
      });
    }
  }
  return calculateClustersAndGetMaxSpacing(edges, numberNodes, numberClusters);
};

const calculateClustersAndGetMaxSpacing = (
  edges: edge[],
  numberNodes: number,
  targetClusters: number
) => {
  const edgesCopy = [...edges];
  const edgesSortedByCost = edgesCopy.sort(
    ({ cost: costA }, { cost: costB }) => {
      return costA - costB;
    }
  );
  const unionFind = new UnionFindArray(numberNodes);
  let numberClusters = unionFind.getNumberClusters();
  while (targetClusters < numberClusters) {
    const { node1, node2 } = edgesSortedByCost.shift()!;
    unionFind.union(node1, node2);
    numberClusters = unionFind.getNumberClusters();
  }
  return calculateMaxSpacing(edgesSortedByCost, unionFind);
};

export const calculateLargestClusterForDistanceBelowThreeFromFile = (
  filename: string
) => {
  const nodes: string[] = [];
  const lines = new nReadlines(filename);
  const [numberNodes, numberBits] = lines
    .next()
    .toString("ascii")
    .split(" ")
    .map(Number);
  let line;
  while ((line = lines.next())) {
    nodes.push(line.toString("ascii").split(" ").join(""));
  }
  const { numberClusters, numberNodesSelected } =
    calculateLargestClusterForDistanceBelowThree(nodes, numberBits);
  return numberNodes - numberNodesSelected + numberClusters;
};

const calculateLargestClusterForDistanceBelowThree = (
  nodes: string[],
  length: number
) => {
  addNodesToMap(nodes);
  const edges = calculateShortEdgesForAllNodes(nodes, length);
  const numberNodesSelected = getNumberNodesFromEdges(edges);
  const unionFind = new UnionFindObject(edges);
  while (edges.length) {
    const { node1, node2 } = edges.shift()!;
    unionFind.union(node1, node2);
  }
  const numberClusters = unionFind.getNumberClusters();

  return { numberClusters, numberNodesSelected };
};

const getNumberNodesFromEdges = (edges: edge[]) => {
  let map = new Map();
  let numberNodes = 0;
  edges.forEach((edge) => {
    const { node1, node2 } = edge;
    if (!map.has(node1)) {
      map.set(node1, true);
      numberNodes++;
    }
    if (!map.has(node2)) {
      map.set(node2, true);
      numberNodes++;
    }
  });
  return numberNodes;
};
