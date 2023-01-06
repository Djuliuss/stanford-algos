import { getSumMedians } from "./median";

(async () => {
  const response = await getSumMedians(
    "/Users/julio/algorithms/course2/median/median.txt"
  );
  console.error(
    `JD!!! medianRunner.ts 7. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
