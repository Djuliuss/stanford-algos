import { city, Flags } from "./types";

export const getEuclideanDistance = (
  { coordinateX: xCityA, coordinateY: yCityA }: city,
  { coordinateX: xCityB, coordinateY: yCityB }: city
) => Math.sqrt((xCityA - xCityB) ** 2 + (yCityA - yCityB) ** 2);

export const getDistanceMatrix = (cities: city[]) => {
  const matrix: number[][] = [];
  for (let i = 0; i < cities.length; i++) {
    matrix[i] = [];
  }
  for (let i = 0; i < cities.length; i++) {
    i % 1000 === 0 && console.info(`i ${i}`);
    for (let j = 0; j < cities.length; j++) {
      const euclideanDistance = getEuclideanDistance(cities[i], cities[j]);
      matrix[i][j] = euclideanDistance;
      matrix[j][i] = euclideanDistance;
    }
  }
  return matrix;
};

export const getClosestCity = (
  cities: city[],
  originCity: number,
  flags: Flags
) => {
  const coordinatesOriginCity = cities[originCity];
  let [distanceClosestCity, closestCity] = [9999999999, 9999999999];
  cities.forEach((city, index) => {
    if (index !== originCity && !flags[index]) {
      const distance = getEuclideanDistance(city, coordinatesOriginCity);
      closestCity = distance < distanceClosestCity ? index : closestCity;
      distanceClosestCity =
        distance < distanceClosestCity ? distance : distanceClosestCity;
    }
  });
  return { distanceClosestCity, closestCity };
};

export const allCitiesVisited = (flags: Flags, numberCities: number) =>
  Object.keys(flags).length === numberCities;
