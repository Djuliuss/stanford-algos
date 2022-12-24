import fs from "fs/promises";
import {
  DirectedGraph,
  FinishingTimes,
  LeaderVertices,
  PredecessorVertices,
  VortexTreated,
} from "./kosarajuTypes";
import { deleteContentObject, invertGraph } from "./kosarajuUtils";
const nReadlines = require("n-readlines");

let exploredVertices: VortexTreated = {};

let finishingTimes: FinishingTimes = {};

let leaderVertices: LeaderVertices = {};

let predecessorVertices: PredecessorVertices = {};

let vortexStack: number[] = [];

let finishingTime = 0;
let leader: number | undefined = undefined;

async function getGraph(filename: string) {
  try {
    const graph: DirectedGraph = {};
    const broadbandLines = new nReadlines(filename);
    let line;
    let maxVortex = 0;

    while ((line = broadbandLines.next())) {
      const numbersRow = line.toString("ascii").split(" ").map(Number);
      const [vortex, ...arcs] = numbersRow;
      if (!graph[vortex]) {
        graph[vortex] = [];
      }
      graph[vortex].push(...arcs);
      arcs.forEach((e: any) => (maxVortex = e > maxVortex ? e : maxVortex));
    }

    // add all missing vertices
    Object.values(graph).forEach((arcs) => {
      arcs.forEach((arc: any) => {
        if (!graph[arc]) {
          graph[arc] = [];
        }
      });
    });
    // add vortex that have no arcs

    for (let index = 1; index < maxVortex; index++) {
      if (!graph[index]) {
        graph[index] = [];
      }
    }
    return graph;
  } catch (err) {
    console.log(err);
  }
}

const recursiveDfs = async (graph: DirectedGraph, iterationVortex: number) => {
  if (exploredVertices[iterationVortex]) {
    // continue
  } else {
    exploredVertices[iterationVortex] = true;
    leaderVertices[iterationVortex] = leader!;
    const adjacentVertices = graph[iterationVortex];
    for (const vortex of adjacentVertices) {
      if (!exploredVertices[vortex]) {
        await recursiveDfs(graph, vortex);
      }
    }
    finishingTimes[finishingTime++] = iterationVortex;
  }
};

const initialiseLoop = () => {
  finishingTime = 0;
  leader = undefined;
  vortexStack = [];
  deleteContentObject(exploredVertices);
  deleteContentObject(leaderVertices);
  deleteContentObject(finishingTimes);
  deleteContentObject(predecessorVertices);
};

const kosarajuLoop = async (graph: DirectedGraph, verticesOrder: number[]) => {
  initialiseLoop();

  let inStack: VortexTreated = {};

  for (const vortex of verticesOrder) {
    const vortexInvertedGraphNumber = Number(vortex);
    if (!exploredVertices[vortexInvertedGraphNumber]) {
      vortexStack.push(vortexInvertedGraphNumber);
      leader = vortexInvertedGraphNumber;
      leaderVertices[vortexInvertedGraphNumber] = leader;
      while (vortexStack.length > 0) {
        const lastVortexInStack = vortexStack.pop()!;
        exploredVertices[lastVortexInStack] = true;
        const adjacentVertices = graph[lastVortexInStack];
        const haveAllBeenProccessedAlready = adjacentVertices.every(
          (e) => exploredVertices[e]
        );
        if (haveAllBeenProccessedAlready) {
          finishingTimes[++finishingTime] = lastVortexInStack;
          if (predecessorVertices[lastVortexInStack]) {
            vortexStack.push(predecessorVertices[lastVortexInStack]);
          }
        } else {
          adjacentVertices.forEach((e) => {
            if (!exploredVertices[e] && !inStack[e]) {
              vortexStack.push(e);
              leaderVertices[e] = leader!;
              predecessorVertices[e] = lastVortexInStack;
              inStack[e] = true;
            }
          });
        }
      }
    }
  }
};

const kosaraju = async (graph: DirectedGraph) => {
  // STEP 1
  console.info(`about to invert the graph`);
  const invertedGraph = invertGraph(graph);
  console.info(`I have inverted the graph`);
  const vortexInvertedGraphInDecreasingOrder = Object.keys(invertedGraph)
    .reverse()
    .map(Number);

  // STEP 2
  initialiseLoop();

  await kosarajuLoop(invertedGraph, vortexInvertedGraphInDecreasingOrder);

  // STEP 3

  console.info(`begin with step 3`);

  const verticesOrderedByFinishingTimeDesc = Object.keys(finishingTimes)
    .reverse()
    .map((e) => finishingTimes[Number(e)]);

  await kosarajuLoop(graph, verticesOrderedByFinishingTimeDesc);
};

export const processKosarajuOnFile = async (filename: string) => {
  const graph = await getGraph(filename);
  console.info(`about to begin with kosaraju`);

  await kosaraju(graph!);
  console.info(`finished with kosaraju`);
  const strictlyConnectedComponents: any = {};
  Object.keys(leaderVertices).forEach((key) => {
    const leader = leaderVertices[Number(key)];
    if (!strictlyConnectedComponents[leader]) {
      strictlyConnectedComponents[leader] = [];
    }
    strictlyConnectedComponents[leader].push(key);
  });
  console.info(`working out totals`);
  const strictlyConnectedComponentsOrderedBySize = Object.values(
    strictlyConnectedComponents
  )
    .map((e: any) => e.length)
    .sort((a, b) => b - a);

  const fiveHighestComponents = strictlyConnectedComponentsOrderedBySize.slice(
    0,
    5
  );
  while (fiveHighestComponents.length < 5) {
    fiveHighestComponents.push(0);
  }
  return fiveHighestComponents;
};
