import { DirectedGraph } from "./kosarajuTypes";
import { graph } from "./testData";

const getTotalArcs = (graph: DirectedGraph) => {
  const totalArcsByVortex = Object.values(graph).map((arcs) => arcs.length);
  const totalArcs = totalArcsByVortex.reduce((acc, el) => acc + el);
  return totalArcs;
};

const validateGraph = (gr1: DirectedGraph, gr2: DirectedGraph) => {
  const verticesGr1 = Object.keys(gr1).length;
  const verticesGr2 = Object.keys(gr2).length;
  if (verticesGr1 !== verticesGr2) {
    throw new Error(`invalid number vertices`);
  }
  const arcsGr1 = getTotalArcs(gr1);
  const arcsGr2 = getTotalArcs(gr2);
  if (arcsGr1 !== arcsGr2) {
    throw new Error(`invalid number arcs`);
  }
};

export const invertGraph = (dgraph: DirectedGraph) => {
  const intevertedGraph: DirectedGraph = {};
  Object.keys(dgraph).forEach((vortex) => {
    const numberVortex = Number(vortex);
    if (!intevertedGraph[numberVortex]) {
      intevertedGraph[numberVortex] = [];
    }
    const arcs = dgraph[numberVortex];
    arcs.forEach((arc) => {
      intevertedGraph[arc]
        ? intevertedGraph[arc].push(numberVortex)
        : (intevertedGraph[arc] = [numberVortex]);
    });
  });
  validateGraph(graph, intevertedGraph);
  return intevertedGraph;
};

export const deleteContentObject = (object: any) => {
  for (const key in object) {
    delete object[key];
  }
};
