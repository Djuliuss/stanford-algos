import exp from "constants";
import { EdgeSet, Graph, VortexSet } from "./types";
import { getCrossingEdges } from "./utils";

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

const testVortexSet: VortexSet = [{ vortexId: 1 }];

const testVortexRminusX: VortexSet = [
  { vortexId: 2 },
  { vortexId: 3 },
  { vortexId: 4 },
];

const tester = () => {
  const responseTest1 = getCrossingEdges(
    testGraph,
    testVortexSet,
    testVortexRminusX
  );
  const expectedResultTest1: EdgeSet = [
    { tail: 1, head: 2, length: 1 },
    { tail: 1, head: 3, length: 4 },
  ];
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
};

tester();
