import { Heap, mergeTrees, nodeSymbol, symbolFile, Tree } from "./types";
import { getPositionsMap } from "./utils";
const nReadlines = require("n-readlines");

export const calculateHuffmanFromFile = async (filename: string) => {
  const symbolFile: symbolFile[] = [];
  const lines = new nReadlines(filename);
  const numberSymbols = Number(lines.next().toString("ascii"));
  let line;
  let i = 1;
  while ((line = lines.next())) {
    const numberFromFile = line.toString("ascii");
    symbolFile.push({
      symbol: i.toString(),
      frequency: Number(numberFromFile),
    });
    i++;
  }
  return calculateHuffman(symbolFile);
};

const calculateHuffman = (symbolsFile: symbolFile[]) => {
  let trees = symbolsFile.map(
    ({ symbol, frequency }) => new Tree({ label: symbol, frequency })
  );
  let positionsMap = getPositionsMap(trees);
  const heap = new Heap();
  trees.forEach((tree) => {
    heap.insertNode(tree.getTopNode().frequency);
  });
  while (trees.length > 1) {
    // if (trees.length % 200 === 0) {
    console.info(`length ${trees.length}`);
    // }
    const smallestFrequency = heap.extractMin()!;
    console.error("JD!!! I AM HERE at huffman.ts 36");

    const secondSmallestFrequency = heap.extractMin()!;

    let positionSmallest: number, positionSecondSmallest: number;
    if (smallestFrequency === secondSmallestFrequency) {
      const positions = positionsMap.get(smallestFrequency);
      [positionSmallest, positionSecondSmallest] = [
        positions![0],
        positions![1]!,
      ];
      const newPositions = positions?.slice(2);
      positionsMap.set(smallestFrequency, newPositions!);
    } else {
      const positionsSmallest = positionsMap.get(smallestFrequency);
      const positionsSecondSmallest = positionsMap.get(secondSmallestFrequency);
      positionSmallest = positionsSmallest![0];
      positionSecondSmallest = positionsSecondSmallest![0];
      const newPositions = positionsSmallest?.slice(1);
      positionsMap.set(smallestFrequency, newPositions!);
      const newPositions2 = positionsSecondSmallest?.slice(1);
      positionsMap.set(secondSmallestFrequency, newPositions2!);
    }
    const treeA = trees[positionSmallest];
    const treeB = trees[positionSecondSmallest];

    const newTree = mergeTrees(treeA, treeB);
    trees = trees.filter(
      (_, index) => ![positionSmallest, positionSecondSmallest].includes(index)
    );
    console.error("JD!!! I AM HERE at huffman.ts 62");

    positionsMap = getPositionsMap(trees);
    trees.push(newTree);
    const addedFrequency =
      treeA.getTopNode().frequency + treeB.getTopNode().frequency;
    heap.insertNode(addedFrequency);
    if (
      positionsMap.has(addedFrequency) &&
      positionsMap.get(addedFrequency)!.length > 0
    ) {
      const existing = positionsMap.get(addedFrequency)!;
      const updated = [...existing, trees.length - 1];
      positionsMap.set(addedFrequency, updated);
    } else {
      positionsMap.set(addedFrequency, [trees.length - 1]);
    }
  }
  getBinaryCodes(trees[0].getTopNode(), "");
  return getMaxMinCodes();
};

const codes: { [label: string]: string } = {};
function getBinaryCodes(node: nodeSymbol, stringSoFar: string) {
  const { leftChild, rightChild, label } = node;
  if (!leftChild && !rightChild) {
    if (!label) {
      throw new Error(`label should be populated`);
    }
    codes[label] = stringSoFar;
    return;
  } else {
    getBinaryCodes(leftChild!, stringSoFar + "0");
    getBinaryCodes(rightChild!, stringSoFar + "1");
  }
}

const getMaxMinCodes = () => {
  let minimumBites = 999999999999;
  let maximumBites = 0;
  Object.keys(codes).forEach((code) => {
    minimumBites =
      codes[code].length < minimumBites ? codes[code].length : minimumBites;
    maximumBites =
      codes[code].length > maximumBites ? codes[code].length : maximumBites;
  });
  return { maximumBites, minimumBites };
};

const testData: symbolFile[] = [
  { symbol: "A", frequency: 60 },
  { symbol: "B", frequency: 25 },

  { symbol: "C", frequency: 10 },
  { symbol: "D", frequency: 5 },
];

// const testData2: symbolFile[] = [
//   { symbol: "A", frequency: 3 },
//   { symbol: "B", frequency: 2 },
//   { symbol: "C", frequency: 6 },
//   { symbol: "D", frequency: 8 },
//   { symbol: "E", frequency: 2 },
//   { symbol: "F", frequency: 6 },
// ];

// const response = calculateHuffman(testData);
// console.error(
//   `JD!!! huffman.ts 104. The value of response is ${JSON.stringify(
//     response,
//     null,
//     2
//   )} `
// );

// (async () => {
//   const response = await calculateHuffmanFromFile(
//     "/Users/julio/algorithms/course3/assignment3HuffmanAndMWIS/foo.txt"
//   );

//   console.error(
//     `JD!!! huffman.ts 137. The value of response is ${JSON.stringify(
//       response,
//       null,
//       2
//     )} `
//   );
// })();
