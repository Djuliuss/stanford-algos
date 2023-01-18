import { calculateHuffmanFromFile } from "./huffman";

(async () => {
  const response = await calculateHuffmanFromFile(
    "/Users/julio/algorithms/course3/assignment3HuffmanAndMWIS/huffman.txt"
  );

  console.error(
    `JD!!! huffmanRunner.ts 6. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
