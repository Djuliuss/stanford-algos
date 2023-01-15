import { ClusterDistances, edge, UnionFind } from "./types";
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
  const edgesSortedByCost = edges.sort(({ cost: costA }, { cost: costB }) => {
    return costA - costB;
  });
  const edgesSortedByCostCopy = [...edgesSortedByCost];
  const unionFind = new UnionFind(numberNodes);
  let numberClusters = numberNodes;
  while (targetClusters < numberClusters) {
    const { node1, node2 } = edgesSortedByCost.shift()!;
    unionFind.union(node1, node2);
    numberClusters--;
  }
  return calculateMaxSpacing(edgesSortedByCostCopy, unionFind);
};

const calculateMaxSpacing = (edges: edge[], unionFind: UnionFind) => {
  const clusterDistances: ClusterDistances = {};
  edges.forEach((edge) => {
    let { node1, node2, cost } = edge;
    // JD!!!
    // ojo
    let cluster1 = unionFind.find(node1);
    let cluster2 = unionFind.find(node2);
    if (cluster1 !== cluster2) {
      // JD!!!
      // probably can be removed
      if (cluster1 > cluster2) {
        [cluster1, cluster2] = [cluster2, cluster1];
      }
      // JD!!!
      // enough ????
      if (!clusterDistances[cluster1]) {
        clusterDistances[cluster1] = {};
      }
      let minDistance = clusterDistances[cluster1][cluster2] || 999999999;
      minDistance = cost < minDistance ? cost : minDistance;
      clusterDistances[cluster1][cluster2] = minDistance;
    }
  });
  return getMaxSpacing(clusterDistances);
};

const getMaxSpacing = (clusterDistances: ClusterDistances) => {
  let maxSpacing = 0;
  const clusterAs = Object.keys(clusterDistances).map(Number);
  for (const clusterA of clusterAs) {
    const clusterBs = Object.keys(clusterDistances[clusterA]).map(Number);
    for (const clusterB of clusterBs) {
      maxSpacing += clusterDistances[clusterA][clusterB];
    }
  }
  return maxSpacing;
};

const testData: edge[] = [
  { node1: 1, node2: 2, cost: 1 },
  { node1: 1, node2: 3, cost: 2 },
  { node1: 1, node2: 4, cost: 4 },
  { node1: 1, node2: 5, cost: 5 },
  { node1: 2, node2: 3, cost: 4 },
  { node1: 2, node2: 4, cost: 3 },
  { node1: 2, node2: 5, cost: 6 },
  { node1: 3, node2: 4, cost: 1 },
  { node1: 3, node2: 5, cost: 7 },
  { node1: 4, node2: 5, cost: 8 },
];

// const responses = [2, 3, 4].map((e) =>
// const responses = [4].map((e) =>
//   calculateClustersAndGetMaxSpacing(testData, 5, e)
// );
// const expectedResponses = [5, 2, 1];

// responses.forEach((_, index) => {
//   if (responses[index] !== expectedResponses[index]) {
//     throw new Error(
//       `Test ${index} failed.  Expected ${expectedResponses[index]} Got ${responses[index]}`
//     );
//   }
// });
