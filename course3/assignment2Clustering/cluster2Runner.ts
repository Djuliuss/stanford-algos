import { calculateLargestClusterForDistanceBelowThreeFromFile } from "./cluster";

(async () => {
  const response = await calculateLargestClusterForDistanceBelowThreeFromFile(
    "/Users/julio/algorithms/course3/assignment2Clustering/clusterQuestion2.txt"
  );
  console.error(
    `JD!!! clusterRunner.ts 8. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
  console.timeEnd("test");
})();
