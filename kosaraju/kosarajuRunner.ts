import { processKosarajuOnFile } from "../course1/kosaraju";

(async () => {
  const response = await processKosarajuOnFile(
    "/Users/julio/algorithms/kosaraju/scc.txt"
  );
  console.info(`the response is ${response}`);
})();
