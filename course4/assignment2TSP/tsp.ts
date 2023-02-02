import {
  binaryToPositions,
  generateBinaryNumbers,
  getNumberOnes,
  setBitToZero,
} from "./binary";
import { city } from "./types";
import { getDistanceMatrix } from "./utils";

const INFINITY = 9999999999;

const getTSP = (cities: city[]) => {
  const distanceMatrix = getDistanceMatrix(cities);
  const numberCities = cities.length;
  const allPossibleSubsets = generateBinaryNumbers(numberCities);
  // filter those that include city 1 and convert to integer
  const subsetsToIterate = allPossibleSubsets
    .filter((e) => e.startsWith("1"))
    .map((e) => parseInt(e, 2));
  const subsetsToIterateCardinality = subsetsToIterate.length;
  const matrixA: number[][] = [];
  // 1 - initialise
  for (let index = 0; index < subsetsToIterateCardinality; index++) {
    const subsetToIterate = subsetsToIterate[index];
    matrixA[subsetToIterate][0] =
      subsetToIterate.toString(2) === "1".repeat(numberCities - 1)
        ? 0
        : INFINITY;
  }
  // 2 - main loop
  for (let m = 2; m <= numberCities; m++) {
    const subsetsWithMCities = subsetsToIterate.filter(
      (e) => getNumberOnes(e.toString(2)) === m
    );
    subsetsWithMCities.forEach((subSet) => {
      const citiesIncludedInSubset = binaryToPositions(subSet.toString(2)).map(
        (e) => e + 1
      );
      citiesIncludedInSubset.forEach((city) => {
        if (city === 1) {
          // continue
        } else {
          const subsetMinusJ = parseInt(
            setBitToZero(subSet.toString(2), city - 1),
            2
          );
          let min = INFINITY;
          for (let k = 0; k < citiesIncludedInSubset.length; k++) {
            const cityK = citiesIncludedInSubset[k];
            if (cityK === city) {
              continue;
            }

            const distanceToK =
              matrixA[subsetMinusJ][cityK - 1] +
              distanceMatrix[cityK - 1][city - 1];
            min = distanceToK < min ? distanceToK : min;
          }
          matrixA[subSet][city - 1] = min;
        }
      });
    });
  }
  // 3 workout final response
  let min = INFINITY;
  const allCitiesSet = parseInt("1".repeat(numberCities), 2);
  for (let index = 2; index <= numberCities; index++) {
    min =
      matrixA[allCitiesSet][index - 1] < min
        ? matrixA[allCitiesSet][index - 1]
        : min;
  }
  return min;
};
