import { resolve } from "path";
import { DirectedGraph } from "./kosarajuTypes";

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
  const verticesGr1Sorted = Object.keys(gr1).sort();
  const verticesGr2Sorted = Object.keys(gr2).sort();
  verticesGr1Sorted.forEach((_, index) => {
    if (verticesGr1Sorted[index] !== verticesGr2Sorted[index]) {
      throw new Error(`invalid vertices`);
    }
  });
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
  validateGraph(dgraph, intevertedGraph);
  return intevertedGraph;
};

export const deleteContentObject = (object: any) => {
  for (const key in object) {
    delete object[key];
  }
};

export const identicalArrays = (arr1: any[], arr2: any[]) => {
  let response = true;
  if (arr1.length !== arr2.length) {
    response = false;
  }
  arr1.forEach((el, index) => {
    if (arr2[index] !== el) {
      response = false;
    }
  });
  return response;
};
