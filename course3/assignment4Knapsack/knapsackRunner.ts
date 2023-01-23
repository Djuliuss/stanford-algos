import { knapsackFromFile } from "./knapsack";

(async () => {
  const response = await knapsackFromFile(
    "/Users/julio/algorithms/course3/assignment4Knapsack/knapsack2.txt"
  );
  console.error(
    `JD!!! knapsackRunner.ts 3. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
