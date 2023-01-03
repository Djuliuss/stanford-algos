import exp from "constants";
import { EdgeSet, Graph, VortexSet } from "./types";
import { getCrossingEdges, getMinDijkstraScoreEdge, INFINITY } from "./utils";

const testGraph: Graph = {
  1: [
    { head: 2, length: 1 },
    { head: 3, length: 4 },
  ],
  2: [
    { head: 3, length: 2 },
    { head: 4, length: 6 },
  ],
  3: [{ head: 4, length: 3 }],
  4: [],
};

const test1VortexSet: VortexSet = [{ vortexId: 1 }];

const test1VortexRminusX: VortexSet = [
  { vortexId: 2 },
  { vortexId: 3 },
  { vortexId: 4 },
];

const expectedResultTest1: EdgeSet = [
  { tail: 1, head: 2, length: 1 },
  { tail: 1, head: 3, length: 4 },
];

const test2Edges = expectedResultTest1;
const lenghtsTest2 = [0, INFINITY, INFINITY];
const exptectedResultTest2 = {
  minDijkstraScore: 1,
  tailMinDijkstraScore: 1,
  headMinDijkstraScore: 2,
};

const tester = () => {
  const responseTest1 = getCrossingEdges(
    testGraph,
    test1VortexSet,
    test1VortexRminusX
  );

  responseTest1.forEach((edge, index) => {
    const {
      head: responseHead,
      tail: responseTail,
      length: responseLength,
    } = edge;
    const {
      head: expectedHead,
      tail: expectedTail,
      length: expectedLength,
    } = expectedResultTest1[index];
    if (responseHead !== expectedHead) {
      throw new Error(
        `Expected ${index} was ${expectedHead} and it was ${responseHead}`
      );
    }
    if (responseTail !== expectedTail) {
      throw new Error(
        `Expected ${index} was ${expectedTail} and it was ${responseTail}`
      );
    }
    if (responseLength !== expectedLength) {
      throw new Error(
        `Expected ${index} was ${expectedLength} and it was ${responseLength}`
      );
    }
  });
  console.info(`test 1 succesful`);

  const responseTest2 = getMinDijkstraScoreEdge(test2Edges, lenghtsTest2);
  if (
    responseTest2.minDijkstraScore !== exptectedResultTest2.minDijkstraScore
  ) {
    throw new Error(
      `test 2 failed. minDijkstraScore obtained ${responseTest2.minDijkstraScore} expected ${exptectedResultTest2.minDijkstraScore}`
    );
  }
  if (
    responseTest2.tailMinDijkstraScore !==
    exptectedResultTest2.tailMinDijkstraScore
  ) {
    throw new Error(
      `test 2 failed. tailMinDijkstraScore obtained ${responseTest2.tailMinDijkstraScore} expected ${exptectedResultTest2.tailMinDijkstraScore}`
    );
  }

  if (
    responseTest2.headMinDijkstraScore !==
    exptectedResultTest2.headMinDijkstraScore
  ) {
    throw new Error(
      `test 2 failed. headMinDijkstraScore obtained ${responseTest2.headMinDijkstraScore} expected ${exptectedResultTest2.headMinDijkstraScore}`
    );
  }

  console.info(`test 2 succesful`);
};

tester();
