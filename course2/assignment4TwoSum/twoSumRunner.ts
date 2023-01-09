import { getTwoSum2 } from "./twoSum";

(async () => {
  const response = await getTwoSum2(
    "/Users/julio/algorithms/course2/assignment4TwoSum/numbersTwoSum.txt"
  );
  console.error(
    `JD!!! twoSumRunner.ts 7. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
