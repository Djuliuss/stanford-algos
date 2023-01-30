import { getAllPairsShortestPathFromFile } from "./allPairsShortestPatheeee";

(async () => {
  const response = await getAllPairsShortestPathFromFile(
    "/Users/julio/algorithms/course4/assignment1AllPairsShortestPath/g1.txt"
  );
  console.error(
    `JD!!! allPairsShortestPathRunner.ts 7. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
