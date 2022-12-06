import { Graph } from "./graph";

const newGraph = new Graph();
newGraph.addVortex(1, [2, 3]);
newGraph.addVortex(2, [1, 3, 4]);
newGraph.addVortex(3, [1, 2, 4]);
newGraph.addVortex(4, [2, 3]);
const minimumCut = newGraph.workOutMinimumCut();
console.info(`the minimum cut is ${minimumCut}`);
