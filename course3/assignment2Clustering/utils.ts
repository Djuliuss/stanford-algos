import { calculatePoint, getStatesByNOnes } from "./binary";
import { edge, UnionFindArray } from "./types";

// expects the an array with the edges that have not been added
export const calculateMaxSpacing = (
  edges: edge[],
  unionFind: UnionFindArray
) => {
  let i = 0;
  let { node1, node2, cost } = edges[i];
  let [cluster1, cluster2] = [unionFind.find(node1), unionFind.find(node2)];
  while (cluster1 === cluster2) {
    i++;
    ({ node1, node2, cost } = edges[i]);
    [cluster1, cluster2] = [unionFind.find(node1), unionFind.find(node2)];
  }
  return cost;
};

let nodeMap: Map<string, number[]> = new Map();
let flags = new Map();

export const addNodesToMap = (nodes: string[]) => {
  nodeMap = new Map();

  nodes.forEach((el, index) =>
    nodeMap.set(
      el,
      nodeMap.has(el) ? [...nodeMap.get(el)!, index + 1] : [index + 1]
    )
  );
};

export const calculateShortEdgesForAllNodes = (
  nodes: string[],
  length: number
) => {
  const edgesForAllNodes: edge[] = [];
  flags = new Map();

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
  [0, 1, 2].forEach((e) => {
    const operators = [...getStatesByNOnes(length, e as 0 | 1 | 2)!];
    edges.push(...processOperators(operators, node, nodeNumber, length, e));
  });
  return edges;
};

const processOperators = (
  operators: string[],
  node: string,
  nodeNumber: number,
  length: number,
  distance: number
) => {
  const edges: edge[] = [];
  operators.forEach((e) => {
    const candidate = calculatePoint(node, e, length);
    if (nodeMap.has(candidate)) {
      const values = nodeMap.get(candidate)?.filter((e) => e !== nodeNumber)!;
      values.forEach((element) => {
        const concatenation = element + "+" + nodeNumber.toString();
        if (!flags.has(concatenation)) {
          edges.push({
            node1: nodeNumber,
            node2: element,
            cost: distance,
          });
          flags.set(nodeNumber.toString() + "+" + element, true);
        }
      });
    }
  });
  return edges;
};
