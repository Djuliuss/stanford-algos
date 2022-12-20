interface DirectedGraph {
  [node: number]: number[];
}

interface FinishingTimes {
  [node: number]: number;
}

const finishingTimes: FinishingTimes = {};

const directedGraph: DirectedGraph = {
  1: [2, 3],
  2: [3, 4],
  3: [5],
  4: [5, 6],
  5: [6],
  6: [],
};

const invertGraph = (dgraph: DirectedGraph) => {
  const intevertedGraph: DirectedGraph = {};
  Object.keys(dgraph).forEach((node) => {
    if (!intevertedGraph[Number(node)]) {
      intevertedGraph[Number(node)] = [];
    }
    const arcs = dgraph[Number(node)];
    arcs.forEach((arc) => {
      intevertedGraph[arc]
        ? intevertedGraph[arc].push(Number(node))
        : (intevertedGraph[arc] = [Number(node)]);
    });
  });
  return intevertedGraph;
};

const invertedGraph = invertGraph(directedGraph);

const kosaraju = (graph: DirectedGraph) => {
  // JD!!!
  // for now let's just work out the finishing times of the input graph
  let finishingTimes = 0;
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
