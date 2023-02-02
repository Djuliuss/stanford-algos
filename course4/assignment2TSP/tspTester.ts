import { getTSP } from "./tsp";
import { city } from "./types";

const testData1: city[] = [
  { coordinateX: 1, coordinateY: 1 },
  { coordinateX: 2, coordinateY: 1 },
];

const expectedResponse1 = 2;

const testData2: city[] = [
  { coordinateX: 0, coordinateY: 0 },
  { coordinateX: 0, coordinateY: 3 },
  { coordinateX: 3, coordinateY: 3 },
];

const expectedResponse2 = 10;

const testData3: city[] = [
  { coordinateX: 0, coordinateY: 2.05 },
  { coordinateX: 3.414213562373095, coordinateY: 3.4642135623730947 },
  { coordinateX: 0.5857864376269049, coordinateY: 0.6357864376269047 },
  { coordinateX: 0.5857864376269049, coordinateY: 3.4642135623730947 },
  { coordinateX: 2, coordinateY: 0 },
  { coordinateX: 4.05, coordinateY: 2.05 },
  { coordinateX: 2, coordinateY: 4.1 },
  { coordinateX: 3.414213562373095, coordinateY: 0.6357864376269047 },
];

const expectedResponse3 = 12;

const testData4: city[] = [
  { coordinateX: 1.0, coordinateY: 1.0 },
  { coordinateX: 1.125, coordinateY: 1.0 },
  { coordinateX: 1.25, coordinateY: 1.0 },
  { coordinateX: 1.5, coordinateY: 1.0 },
  { coordinateX: 1.75, coordinateY: 1.0 },
  { coordinateX: 2.0, coordinateY: 1.0 },
  { coordinateX: 1.0, coordinateY: 2.0 },
  { coordinateX: 1.125, coordinateY: 2.0 },
  { coordinateX: 1.25, coordinateY: 2.0 },
  { coordinateX: 1.5, coordinateY: 2.0 },
  { coordinateX: 1.75, coordinateY: 2.0 },
  { coordinateX: 2.0, coordinateY: 2.0 },
];

const expectedResponse4 = 4;

const testSet: Array<{ testData: city[]; expectedResponse: number }> = [
  { testData: testData1, expectedResponse: expectedResponse1 },
  { testData: testData2, expectedResponse: expectedResponse2 },
  { testData: testData3, expectedResponse: expectedResponse3 },
  { testData: testData4, expectedResponse: expectedResponse4 },
];

testSet.forEach(({ testData, expectedResponse }) => {
  const response = getTSP(testData)!;
  if (response !== expectedResponse) {
    throw new Error(`test failed`);
  }
});
console.info(`TESTS SUCCESSFUL`);
