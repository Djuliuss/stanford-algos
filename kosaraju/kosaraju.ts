import fs from "fs/promises";
import {
  DirectedGraph,
  FinishingTimes,
  LeaderVertices,
  PredecessorVertices,
  VortexTreated,
} from "./kosarajuTypes";
import { deleteContentObject, invertGraph } from "./kosarajuUtils";

let exploredVertices: VortexTreated = {};

let finishingTimes: FinishingTimes = {};

let leaderVertices: LeaderVertices = {};

let predecessorVertices: PredecessorVertices = {};

let vortexStack: number[] = [];

let finishingTime = 0;
let leader: number | undefined = undefined;

async function getGraph(filename: string) {
  try {
    const data = await fs.readFile(filename, {
      encoding: "utf8",
    });
    const parsedNumbers = data.split("\n");
    // parsedNumbers.pop();
    const graph: DirectedGraph = {};
    parsedNumbers.forEach((row: any) => {
      const numbersRow = row.split(" ").map(Number);
      const [vortex, ...arcs] = numbersRow;
      graph[vortex] = graph[vortex] ? graph[vortex].concat(arcs) : [...arcs];
    });
    // add all missing vertices
    Object.values(graph).forEach((arcs) => {
      arcs.forEach((arc: any) => {
        if (!graph[arc]) {
          graph[arc] = [];
        }
      });
    });
    // add vortex that have no arcs
    const maxVortex = Math.max(...Object.keys(graph).map(Number));
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

const kosaraju = async (graph: DirectedGraph) => {
  // STEP 1

  const invertedGraph = invertGraph(graph);
  console.info(`I have inverted the graph`);
  const vortexInvertedGraphInDecreasingOrder =
    Object.keys(invertedGraph).reverse();

  // STEP 2
  initialiseLoop();

  console.info(`begin with step 2`);

  for (const vortexInvertedGraph of vortexInvertedGraphInDecreasingOrder) {
    const vortexInvertedGraphNumber = Number(vortexInvertedGraph);
    if (!exploredVertices[vortexInvertedGraphNumber]) {
      vortexStack.push(vortexInvertedGraphNumber);
      leader = vortexInvertedGraphNumber;
      leaderVertices[vortexInvertedGraphNumber] = leader;
      while (vortexStack.length > 0) {
        const lastVortexInStack = vortexStack.pop()!;
        exploredVertices[lastVortexInStack] = true;
        const adjacentVertices = invertedGraph[lastVortexInStack];
        const haveAllBeenProccessedAlready = adjacentVertices.every(
          (e) => exploredVertices[e]
        );
        if (haveAllBeenProccessedAlready) {
          finishingTime++;
          finishingTimes[finishingTime] = lastVortexInStack;
          if (predecessorVertices[lastVortexInStack]) {
            vortexStack.push(predecessorVertices[lastVortexInStack]);
          }
        } else {
          adjacentVertices.forEach((e) => {
            if (!exploredVertices[e] && !vortexStack.includes(e)) {
              vortexStack.push(e);
              leaderVertices[e] = leader!;
              predecessorVertices[e] = lastVortexInStack;
            }
          });
        }
      }
    }
  }

  // STEP 3

  console.info(`begin with step 3`);

  const verticesOrderedByFinishingTimeDesc = Object.keys(finishingTimes)
    .reverse()
    .map((e) => finishingTimes[Number(e)]);

  initialiseLoop();

  for (const vortex of verticesOrderedByFinishingTimeDesc) {
    const vortexNumber = Number(vortex);
    if (!exploredVertices[vortexNumber]) {
      vortexStack.push(vortexNumber);
      leader = vortexNumber;
      leaderVertices[vortexNumber] = leader;
      while (vortexStack.length > 0) {
        const lastVortexInStack = vortexStack.pop()!;
        exploredVertices[lastVortexInStack] = true;
        const adjacentVertices = graph[lastVortexInStack];
        const haveAllBeenProccessedAlready = adjacentVertices.every(
          (e) => exploredVertices[e]
        );
        if (haveAllBeenProccessedAlready) {
          finishingTime++;
          finishingTimes[finishingTime] = lastVortexInStack;
          if (predecessorVertices[lastVortexInStack]) {
            vortexStack.push(predecessorVertices[lastVortexInStack]);
          }
        } else {
          adjacentVertices.forEach((e) => {
            if (!exploredVertices[e] && !vortexStack.includes(e)) {
              vortexStack.push(e);
              leaderVertices[e] = leader!;
              predecessorVertices[e] = lastVortexInStack;
            }
          });
        }
      }
    }
  }
};

export const processKosarajuOnFile = async (filename: string) => {
  const graph = await getGraph(filename);
  console.info(`about to begin with kosaraju`);

  await kosaraju(graph!);
  console.info(`finished with kosaraju`);
  const strictlyConnectedComponents: any = {};
  let i = 0;
  Object.keys(leaderVertices).forEach((key) => {
    if (i++ % 1000 === 0) {
      console.info(`now i is ${i}`);
    }
    const leader = leaderVertices[Number(key)];
    if (!strictlyConnectedComponents[leader]) {
      strictlyConnectedComponents[leader] = [];
    }
    strictlyConnectedComponents[leader].push(key);
    // const verticesForThisLeader = strictlyConnectedComponents[leader]
    //   ? strictlyConnectedComponents[leader].concat(key)
    //   : [key];
    // strictlyConnectedComponents[leader] = verticesForThisLeader;
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
