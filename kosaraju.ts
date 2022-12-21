import { Console } from "console";
import {
  DirectedGraph,
  FinishingTimes,
  LeaderVertices,
  VortexTreated,
} from "./kosarajuTypes";
import { deleteContentObject, invertGraph } from "./kosarajuUtils";
import { graph, invertedGraph } from "./testData";

let exploredVertices: VortexTreated = {};

let finishingTimes: FinishingTimes = {};

let leaderVertices: LeaderVertices = {};

let finishingTime = 0;
let leader: number | undefined = undefined;

const recursiveDfs = (graph: DirectedGraph, iterationVortex: number) => {
  if (exploredVertices[iterationVortex]) {
    // continue
  } else {
    exploredVertices[iterationVortex] = true;
    leaderVertices[iterationVortex] = leader!;
    const adjacentVertices = graph[iterationVortex];
    adjacentVertices.forEach((vortex) => {
      if (!exploredVertices[vortex]) {
        recursiveDfs(graph, vortex);
      }
    });
    finishingTimes[finishingTime++] = iterationVortex;
  }
};

const initialiseLoop = () => {
  finishingTime = 0;
  leader = undefined;
  deleteContentObject(exploredVertices);
  deleteContentObject(leaderVertices);
  deleteContentObject(finishingTimes);
};

const kosaraju = (graph: DirectedGraph) => {
  // STEP 1

  const invertedGraph = invertGraph(graph);
  const vortexInvertedGraphInDecreasingOrder =
    Object.keys(invertedGraph).reverse();

  // STEP 2
  initialiseLoop();

  vortexInvertedGraphInDecreasingOrder.forEach((vortexInvertedGraph) => {
    const vortexInvertedGraphNumber = Number(vortexInvertedGraph);
    leader = vortexInvertedGraphNumber;
    recursiveDfs(invertedGraph, vortexInvertedGraphNumber);
  });

  // STEP 3

  const verticesOrderedByFinishingTimeDesc = Object.keys(finishingTimes)
    .reverse()
    .map((e) => finishingTimes[Number(e)]);

  initialiseLoop();
  verticesOrderedByFinishingTimeDesc.forEach((vortex) => {
    console.info(`PROCESSING VORTEX NUMBER ${vortex}`);
    leader = vortex;
    recursiveDfs(graph, vortex);
  });
};

kosaraju(graph);
// JD!!!
// ANY
const strictlyConnectedComponents: any = {};
Object.keys(leaderVertices).forEach((key) => {
  const leader = leaderVertices[Number(key)];
  const verticesForThisLeader = strictlyConnectedComponents[leader]
    ? strictlyConnectedComponents[leader].concat(key)
    : [key];
  strictlyConnectedComponents[leader] = verticesForThisLeader;
});

console.error(
  `JD!!! kosaraju.ts 116. The value of strictlyConnectedComponents is ${JSON.stringify(
    strictlyConnectedComponents,
    null,
    2
  )} `
);
