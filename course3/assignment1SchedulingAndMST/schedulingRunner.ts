import { getJobsFromFile, getWeightedCompletedTime } from "./scheduling";
import { sortByDifference, sortByRatio } from "./utils";

(async () => {
  const response1 = await getWeightedCompletedTime(
    await getJobsFromFile(
      "/Users/julio/algorithms/course3/assignment1SchedulingAndMST/jobs.txt"
    ),
    sortByDifference
  );
  const response2 = await getWeightedCompletedTime(
    await getJobsFromFile(
      "/Users/julio/algorithms/course3/assignment1SchedulingAndMST/jobs.txt"
    ),
    sortByRatio
  );
  console.error(
    `JD!!! schedulingRunner.ts 17. The value of response1 is ${JSON.stringify(
      response1,
      null,
      2
    )} `
  );
  console.error(
    `JD!!! schedulingRunner.ts 18. The value of response2 is ${JSON.stringify(
      response2,
      null,
      2
    )} `
  );
})();
