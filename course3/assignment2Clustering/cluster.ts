import { edge, UnionFindArray, UnionFindObject } from "./types";
import { calculateMaxSpacing } from "./utils";
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
  return calculateMaxSpacing(edgesCopy, unionFind);
};
