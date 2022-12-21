import { DirectedGraph } from "./kosarajuTypes";

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
  return intevertedGraph;
};

export const deleteContentObject = (object: any) => {
  for (const key in object) {
    delete object[key];
  }
};
