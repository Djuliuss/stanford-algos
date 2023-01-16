import { calculateClustersAndGetMaxSpacingFromFile } from "./cluster";

(async () => {
  const response = await calculateClustersAndGetMaxSpacingFromFile(
    "/Users/julio/algorithms/course3/assignment2Clustering/clusterQuestion1.txt",
    4
  );
  console.error(
    `JD!!! clusterRunner.ts 8. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
