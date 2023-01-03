import { Arc, Graph } from "./types";
const nReadlines = require("n-readlines");

export const getGraphFromFile = (filename: string) => {
  const graph: Graph = {};
  const broadbandLines = new nReadlines(filename);
  let line;
  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" ");
    const [vortexId, ...arcs] = numbersRow;
    arcs.forEach((arcFile: any) => {
      const [arcHead, arcLength] = arcFile.split(",");
      const arc: Arc = {
        head: arcHead,
        length: arcLength,
      };
      if (graph[vortexId]) {
        graph[vortexId].push(arc);
      } else {
        graph[vortexId] = [arc];
      }
      if (!graph[arcHead]) {
        graph[arcHead] = [];
      }
    });
  }
  return graph;
};
