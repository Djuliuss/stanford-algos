import { vortex } from "./types";
const nReadlines = require("n-readlines");

export const calculateWmisFromFile = async (filename: string) => {
  const vertices: vortex[] = [];
  const lines = new nReadlines(filename);
  const numberVertices = Number(lines.next().toString("ascii"));
  let index = 1;
  let line;
  while ((line = lines.next())) {
    vertices.push({
      vortexNumber: index,
      weight: Number(line.toString("ascii")),
    });
    index++;
  }
  return calculateWmis(vertices);
};

const calculateWmis = (vertices: vortex[]): vortex[] => {
  if ([0, 1].includes(vertices.length)) {
    return vertices;
  }
  const lastVortex = vertices[vertices.length - 1];
  const g1 = vertices.slice(0, -1);
  const g2 = vertices.slice(0, -2);
  const s1 = calculateWmis(g1);
  const s2 = calculateWmis(g2);
  const totalWeightS1 = totalWeight(s1);
  const totalWeightS2 = totalWeight([...s2, lastVortex]);
  return totalWeightS1 > totalWeightS2 ? s1 : [...s2, lastVortex];
};

const totalWeight = (vertices: vortex[]) =>
  vertices.reduce((acc, { weight }) => (acc += weight), 0);

// const testData: vortex[] = [
//   { vortexNumber: 1, weight: 1 },
//   { vortexNumber: 2, weight: 4 },
//   { vortexNumber: 3, weight: 5 },
//   { vortexNumber: 4, weight: 4 },
// // ];

// const response = calculateWmisFromFile(
//   "/Users/julio/algorithms/course3/assignment3HuffmanAndMWIS/testCases/question3/input_random_1_10.txt"
// );
// console.error(
//   `JD!!! wis.ts 30. The value of response is ${JSON.stringify(
//     response,
//     null,
//     2
//   )} `
// );
