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
  // nodes.forEach((el) => {
  //   if (!nodeMap.has(el)) {
  //     console.error(`${el} is missing`);
  //   }
  // });

  // console.info(`nodes length ${nodes.length}`);
  // console.info(`map length ${nodeMap.size}`);
  // console.info(`1:`);
  // console.info(JSON.stringify(nodes.sort()));
  // console.info(`2:`);
  // console.info(JSON.stringify([...nodeMap.keys()].sort()));
  // continue
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
  const operatorsDistanceOne = [...getStatesWithOneOne(length)];
  const operatorsDistanceTwo = [...getStatesWithTwoOnes(length)];
  // get duplicates
  const values = nodeMap.get(node)?.filter((e) => e !== nodeNumber)!;
  values.forEach((element) => {
    const concatenation = element + "+" + nodeNumber.toString();
    if (!flags.has(concatenation)) {
      edges.push({
        node1: nodeNumber,
        node2: element,
        cost: 0,
      });
      flags.set(nodeNumber.toString() + "+" + element, true);
    }
  });

  //
  operatorsDistanceOne.forEach((e) => {
    const candidate = calculatePoint(node, e, length);
    if (nodeMap.has(candidate)) {
      const values = nodeMap.get(candidate)?.filter((e) => e !== nodeNumber)!;
      values.forEach((element) => {
        const concatenation = element + "+" + nodeNumber.toString();
        if (!flags.has(concatenation)) {
          edges.push({
            node1: nodeNumber,
            node2: element,
            cost: 1,
          });
          flags.set(nodeNumber.toString() + "+" + element, true);
        }
      });
    }
  });
  operatorsDistanceTwo.forEach((e) => {
    const candidate = calculatePoint(node, e, length);
    if (nodeMap.has(candidate)) {
      const values = nodeMap.get(candidate)?.filter((e) => e !== nodeNumber)!;
      values.forEach((element) => {
        const concatenation = element + "+" + nodeNumber.toString();
        if (!flags.has(concatenation)) {
          edges.push({
            node1: nodeNumber,
            node2: element,
            cost: 2,
          });
          flags.set(nodeNumber.toString() + "+" + element, true);
        }
      });
    }
  });
  return edges;
};
