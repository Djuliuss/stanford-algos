import { calculateWmisFromFile } from "./wis";
import { workOutResponse } from "./wisTester";

(async () => {
  const response = workOutResponse(
    await calculateWmisFromFile(
      "/Users/julio/algorithms/course3/assignment3HuffmanAndMWIS/wis.txt"
    )
  );
  console.error(
    `JD!!! wisRunner.ts 10. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
