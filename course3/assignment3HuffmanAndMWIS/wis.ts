import { vortex } from "./types";
const nReadlines = require("n-readlines");

let map: Map<string, vortex[]> = new Map();

export const calculateWmisFromFile = async (filename: string) => {
  const vertices: vortex[] = [];
  const lines = new nReadlines(filename);
  const numberVertices = Number(lines.next().toString("ascii"));
  let index = 1;
  let line;
  while ((line = lines.next())) {
    vertices.push({
      vortexNumber: index.toString(),
      weight: Number(line.toString("ascii")),
    });
    index++;
  }
  map = new Map();
  return calculateWmis2(vertices);
};

const calculateWmis = (vertices: vortex[]): vortex[] => {
  if ([0, 1].includes(vertices.length)) {
    return vertices;
  }
  const lastVortex = vertices[vertices.length - 1];
  const g1 = vertices.slice(0, -1);
  const g2 = vertices.slice(0, -2);
  const key1 = mergeVerticesNumbers(g1);
  const key2 = mergeVerticesNumbers(g2);
  if (!map.has(key1)) {
    map.set(key1, calculateWmis(g1));
  }
  if (!map.has(key2)) {
    map.set(key2, calculateWmis(g2));
  }

  const s1 = map.get(key1)!;
  const s2 = map.get(key2)!;

  const totalWeightS1 = totalWeight(s1);
  const totalWeightS2 = totalWeight([...s2, lastVortex]);
  return totalWeightS1 > totalWeightS2 ? s1 : [...s2, lastVortex];
};

// JD!!!
// THIS FUNCTION WORKS MUCH FASTER AND BETTER THAN THE PREVIOUS calculateWmis. Also, no stack size errors
const calculateWmis2 = (vertices: vortex[]) => {
  const a: vortex[][] = [];
  a[0] = [];
  a[1] = [vertices[0]];
  for (let index = 2; index <= vertices.length; index++) {
    a[index] =
      totalWeight(a[index - 1]) >
      totalWeight([...a[index - 2], vertices[index - 1]])
        ? a[index - 1]
        : [...a[index - 2], vertices[index - 1]];
  }
  return a[a.length - 1];
};

// JD!!!
// using weights, not working at the moment
const calculateWmis3 = (vertices: vortex[]) => {
  const a: number[] = [];
  a[0] = 0;
  a[1] = vertices[0].weight;
  for (let index = 2; index <= vertices.length; index++) {
    a[index] = Math.max(
      a[index - 1],
      a[index - 2] + vertices[index - 1].weight
    );
  }
  return constructSolutions(a, vertices);
};

const constructSolutions = (a: number[], vertices: vortex[]) => {
  const verticesSolution: vortex[] = [];
  let index = vertices.length - 1;
  while (index >= 0) {
    if (a[index - 1] >= a[index - 2] + vertices[index].weight) {
      index--;
    } else {
      verticesSolution.push(vertices[index]);
      index -= 2;
    }
  }
  return verticesSolution;
};

const mergeVerticesNumbers = (vertices: vortex[]) =>
  vertices.reduce((acc, { vortexNumber }) => (acc += "/" + vortexNumber), "");

const totalWeight = (vertices: vortex[]) =>
  vertices.reduce((acc, { weight }) => (acc += weight), 0);

const testData: vortex[] = [
  { vortexNumber: "1", weight: 1 },
  { vortexNumber: "2", weight: 4 },
  { vortexNumber: "3", weight: 5 },
  { vortexNumber: "4", weight: 4 },
];

const response = calculateWmis3(testData);
console.error(
  `JD!!! wis.ts 30. The value of response is ${JSON.stringify(
    response,
    null,
    2
  )} `
);
