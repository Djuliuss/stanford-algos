import cluster from "cluster";
import { ClusterDistances, edge, UnionFind } from "./types";

const calculateClustersAndGetMaxSpacing = (
  edges: edge[],
  numberNodes: number,
  targetClusters: number
) => {
  const edgesSortedByCost = edges.sort(({ cost: costA }, { cost: costB }) => {
    return costA - costB;
  });
  const unionFind = new UnionFind(numberNodes);
  let numberClusters = numberNodes;
  while (targetClusters < numberClusters) {
    const { node1, node2 } = edgesSortedByCost.shift()!;
    unionFind.union(node1, node2);
    numberClusters--;
  }
  return calculateMaxSpacing(edgesSortedByCost, unionFind);
};

const calculateMaxSpacing = (edges: edge[], unionFind: UnionFind) => {
  const clusterDistances: ClusterDistances = {};
  edges.forEach((edge) => {
    let { node1, node2, cost } = edge;
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
