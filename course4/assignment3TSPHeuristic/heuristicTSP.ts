import { city } from "./types";
import { getDistanceMatrix } from "./utils";
const nReadlines = require("n-readlines");

const INFINITY = 9999999999;

export const getTspFromFile = async (filename: string) => {
  const cities: city[] = [];
  const broadbandLines = new nReadlines(filename);
  // JD!!!
  // ignore first row
  let line = broadbandLines.next();

  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" ").map(Number); //  with spaces.
    cities.push({ coordinateX: numbersRow[0], coordinateY: numbersRow[1] });
  }
  const distanceMatrix = getDistanceMatrix(cities);
  return getHeurisiticTSP(cities, distanceMatrix);
};

export const getHeurisiticTSP = async (
  cities: city[],
  distanceMatrix: number[][]
) => {};
