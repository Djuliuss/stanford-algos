import { processKosarajuOnFile } from "./kosaraju";

(async () => {
  const response = await processKosarajuOnFile(
    "/Users/julio/algorithms/course2/kosaraju/scc.txt"
  );
  console.info(`the response is ${response}`);
})();
