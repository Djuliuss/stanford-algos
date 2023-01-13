import { EdgeSet, Graph, job, JobSorter, VortexSet } from "./types";

export const sortByDifference: JobSorter = (a: job, b: job) => {
  const { length: lengthA, weight: weightA } = a;
  const { length: lengthB, weight: weightB } = b;
  const differenceA = weightA - lengthA;
  const differenceB = weightB - lengthB;
  const weightAIsLarger = weightA > weightB;
  if (differenceA === differenceB) {
    return weightAIsLarger ? -1 : 1;
  } else {
    return differenceB - differenceA;
  }
};

export const sortByRatio: JobSorter = (a: job, b: job) => {
  const { length: lengthA, weight: weightA } = a;
  const { length: lengthB, weight: weightB } = b;
  const ratioA = weightA / lengthA;
  const ratioB = weightB / lengthB;
  return ratioB - ratioA;
};

export const getCrossingEdges = (
  graph: Graph,
  setX: VortexSet,
  setVminusX: VortexSet
): EdgeSet => {
  const crossingEdges: EdgeSet = [];
  const vortexIdsetVminusX = setVminusX.map(({ vortexId }) => vortexId);
  for (const vortexX of setX) {
    const { vortexId } = vortexX;
    const edgesVortexX = graph[vortexId];
    for (const edgeVorteX of edgesVortexX) {
      if (vortexIdsetVminusX.includes(edgeVorteX.vortexId)) {
        crossingEdges.push({
          u: vortexId,
          v: edgeVorteX.vortexId,
          length: edgeVorteX.length,
        });
      }
    }
  }
  return crossingEdges;
};
