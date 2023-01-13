import { getCostUsingPrimFromFile } from "./prim";

(async () => {
  const response = await getCostUsingPrimFromFile(
    "/Users/julio/algorithms/course3/assignment1SchedulingAndMST/graph.txt"
  );
  console.error(
    `JD!!! primRunner.ts 7. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
