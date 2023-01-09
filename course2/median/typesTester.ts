import exp from "constants";
import { Heap } from "./types";

const heap = new Heap();

const initialValues = [4, 4, 8, 9, 4, 12, 9, 11, 13];
initialValues.forEach((e) => heap.insertNode(e));

let expectedSize = initialValues.length;
let returnedSize = heap.getSize();
if (returnedSize !== expectedSize) {
  throw new Error(
    `after intialising the size should be ${initialValues.length}. Got ${returnedSize}`
  );
}

for (let i = 1; i <= returnedSize; i++) {
  const expectedValue = initialValues[i - 1];
  const returnedValue = heap.getNodeValue(i);
  if (expectedValue !== returnedValue) {
    throw new Error(
      `for node ${i} I was expecting ${expectedValue} got ${returnedValue}`
    );
  }
}

const moreValues = [7, 10];
moreValues.forEach((e) => heap.insertNode(e));
returnedSize = heap.getSize();

expectedSize += moreValues.length;
if (returnedSize !== expectedSize) {
  throw new Error(
    `after adding two more nodes the size should be ${initialValues.length}. Got ${returnedSize}`
  );
}

const finalValues = [5, 1];

finalValues.forEach((e) => heap.insertNode(e));
returnedSize = heap.getSize();

expectedSize += finalValues.length;
if (returnedSize !== expectedSize) {
  throw new Error(
    `after adding the final node the size should be ${initialValues.length}. Got ${returnedSize}`
  );
}

// JD!!!
// this is a brittle test

const expectedNodeValuesAfterInsertions = [
  1, 4, 4, 9, 4, 5, 9, 11, 13, 7, 10, 12, 8,
];

for (let i = 1; i <= returnedSize; i++) {
  const expectedValue = expectedNodeValuesAfterInsertions[i - 1];
  const returnedValue = heap.getNodeValue(i);
  if (expectedValue !== returnedValue) {
    throw new Error(
      `for node ${i} I was expecting ${expectedValue} got ${returnedValue}`
    );
  }
}
KeyboardEvent;
heap.extractMin();
expectedSize--;
returnedSize = heap.getSize();

if (returnedSize !== expectedSize) {
  throw new Error(
    `After extracting min I was expecting size ${expectedSize} I got ${returnedSize}`
  );
}

const expectedNodeValuesAfterExtractingMin = [
  4, 4, 4, 9, 7, 5, 9, 11, 13, 8, 10, 12,
];

for (let i = 1; i <= returnedSize; i++) {
  const expectedValue = expectedNodeValuesAfterExtractingMin[i - 1];
  const returnedValue = heap.getNodeValue(i);
  if (expectedValue !== returnedValue) {
    throw new Error(
      `for node ${i} I was expecting ${expectedValue} but I got ${returnedValue} after extracting min`
    );
  }
}

console.info(`tests ran succesfully!!!`);
