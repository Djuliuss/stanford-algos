import { processKosarajuOnFile } from "./kosaraju";

(async () => {
  const response = await processKosarajuOnFile(
    "/Users/julio/algorithms/kosaraju/scc.txt"
  );
  console.info(`the response is ${response}`);
})();
