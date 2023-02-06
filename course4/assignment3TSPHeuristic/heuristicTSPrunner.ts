import { getHeuristicTspFromFile } from "./heuristicTSP";

(async () => {
  const response = await getHeuristicTspFromFile(
    "/Users/julio/algorithms/course4/assignment3TSPHeuristic/heuristicTSP.txt"
  );

  console.error(
    `JD!!! heuristicTSPrunner.ts 7. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
