import { city, Flags } from "./types";
import {
  allCitiesVisited,
  getClosestCity,
  getEuclideanDistance,
} from "./utils";
const nReadlines = require("n-readlines");

export const getHeuristicTspFromFile = async (filename: string) => {
  const cities: city[] = [];
  const broadbandLines = new nReadlines(filename);
  // JD!!!
  // ignore first row
  let line = broadbandLines.next();

  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" ").map(Number); //  with spaces.
    cities.push({ coordinateX: numbersRow[1], coordinateY: numbersRow[2] });
  }
  return getHeurisiticTSP(cities);
};

export const getHeurisiticTSP = async (cities: city[]) => {
  const flags: Flags = {};
  const numberCities = cities.length;
  let [lengthWalk, currentCity] = [0, 0];
  flags[0] = true;

  while (!allCitiesVisited(flags, numberCities)) {
    Object.keys(flags).length % 100 === 0 &&
      console.info(`done ${Object.keys(flags).length} so far`);
    const { distanceClosestCity, closestCity } = getClosestCity(
      cities,
      currentCity,
      flags
    );
    lengthWalk += distanceClosestCity;
    flags[closestCity] = true;
    currentCity = closestCity;
  }
  lengthWalk += getEuclideanDistance(cities[currentCity], cities[0]);
  return Math.floor(lengthWalk);
};
