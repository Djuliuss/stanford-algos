import { heuristicGetTspFromFile } from "./tsp";

(async () => {
  console.time("test");

  const response = await heuristicGetTspFromFile(
    "/Users/julio/algorithms/course4/assignment2TSP/tsp.txt"
  );
  console.error(
    `JD!!! tspRunner.ts 7. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
  console.timeEnd("test");
})();
