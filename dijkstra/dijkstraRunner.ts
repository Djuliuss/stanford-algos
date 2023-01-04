import { getLengthsThroughDijskstraFromFile } from "./dijkstra";

(async () => {
  const response = await getLengthsThroughDijskstraFromFile(
    "/Users/julio/algorithms/dijkstra/dijkstraData.txt"
  );
  const finalResponse = response.filter((_, index) =>
    [6, 36, 58, 81, 98, 114, 132, 164, 187, 196].includes(index)
  );
  console.error(
    `JD!!! dijkstraRunner.ts 10. The value of finalResponse is ${JSON.stringify(
      finalResponse,
      null,
      2
    )} `
  );
})();
