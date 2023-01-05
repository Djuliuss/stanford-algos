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

console.info(`tests run succesfully!!!`);
