interface Graph {
  [node: number]: number[];
}
const graph: Graph = {
  1: [2, 3],
  2: [1, 4, 3],
  3: [1, 5, 2],
  4: [2, 6, 5],
  5: [3, 6, 4],
  6: [4, 5],
};

interface VortexTreated {
  [node: number]: boolean;
}

const addedVertices: VortexTreated = {};

const vortexStack: number[] = [];

const dfs = (graph: Graph) => {
  const firstVortex = Number(Object.keys(graph)[0]);
  processVortex(firstVortex);
  while (vortexStack.length > 0) {
    const lastVortexInStack = vortexStack.pop()!;
    const adjacentVertices = graph[lastVortexInStack];
    adjacentVertices.forEach((e) => {
      if (!addedVertices[e]) {
        processVortex(e);
      }
    });
  }
};

const processVortex = (vortex: number) => {
  vortexStack.push(vortex);
  addedVertices[vortex] = true;
  console.info(`process vortex ${vortex}`);
};

dfs(graph);
