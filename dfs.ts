import { start } from "repl";

interface Graph {
  [node: number]: number[];
}
const graph: Graph = {
  1: [2, 3],
  2: [1, 3, 4],
  3: [1, 2, 5],
  4: [2, 5, 6],
  5: [3, 4, 6],
  6: [4, 5],
};

interface VortexTreated {
  [node: number]: boolean;
}

const exploredVertices: VortexTreated = {};

const vortexStack: number[] = [];

const dfs = (graph: Graph) => {
  const firstVortex = Number(Object.keys(graph)[0]);
  vortexStack.push(firstVortex);
  while (vortexStack.length > 0) {
    const lastVortexInStack = vortexStack.pop()!;
    exploredVertices[lastVortexInStack] = true;
    const adjacentVertices = graph[lastVortexInStack];
    adjacentVertices.forEach(
      (e) =>
        !exploredVertices[e] && !vortexStack.includes(e) && vortexStack.push(e)
    );
    console.info(`processed vortex ${lastVortexInStack}`);
  }
};

const recursiveDfs = (graph: Graph, interationVortex: number) => {
  console.info(`explored node ${interationVortex}`);
  exploredVertices[interationVortex] = true;
  const adjacentVertices = graph[interationVortex];
  adjacentVertices.forEach((vortex) => {
    if (!exploredVertices[vortex]) {
      recursiveDfs(graph, vortex);
    }
  });
};

recursiveDfs(graph, 1);
