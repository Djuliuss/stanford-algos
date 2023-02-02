import { city } from "./types";

const getEuclideanDistance = (
  { coordinateX: xCityA, coordinateY: yCityA }: city,
  { coordinateX: xCityB, coordinateY: yCityB }: city
) => Math.sqrt((xCityA - xCityB) ** 2 + (yCityA - yCityB) ** 2);

export const getDistanceMatrix = (cities: city[]) => {
  const matrix: number[][] = [];
  for (let i = 0; i < cities.length; i++) {
    matrix[i] = [];
  }
  for (let i = 0; i < cities.length; i++) {
    for (let j = 0; j < cities.length; j++) {
      const euclideanDistance = getEuclideanDistance(cities[i], cities[j]);
      matrix[i][j] = euclideanDistance;
      matrix[j][i] = euclideanDistance;
    }
  }
  return matrix;
};
