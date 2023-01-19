import { vortex } from "./types";

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

const testData: vortex[] = [
  { vortexNumber: 1, weight: 1 },
  { vortexNumber: 2, weight: 4 },
  { vortexNumber: 3, weight: 5 },
  { vortexNumber: 4, weight: 4 },
];

const response = calculateWmis(testData);
console.error(
  `JD!!! wis.ts 30. The value of response is ${JSON.stringify(
    response,
    null,
    2
  )} `
);
