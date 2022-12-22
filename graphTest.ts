import fs from "fs/promises";
import { Graph } from "./graph";

async function getNumbers() {
  try {
    const data = await fs.readFile("kargerMinCut.txt", { encoding: "utf8" });
    const parsedNumbers = data.split("\n");
    parsedNumbers.pop();
    return parsedNumbers;
  } catch (err) {
    console.log(err);
  }
}

let globalMinimumCut = 10000000;

(async () => {
  let iteration = 1;
  while (iteration < 1000) {
    iteration % 100 === 0 && console.info(`iteration ${iteration}`);
    const numbers: any = await getNumbers();
    const graph = new Graph();
    numbers.forEach((row: any) => {
      const numbersRow = row.split(";").map(Number);
      numbersRow.pop();
      graph.addVortex(numbersRow[0], numbersRow.slice(1));
    });
    const minimumCut = graph.workOutMinimumCut();
    globalMinimumCut =
      minimumCut < globalMinimumCut ? minimumCut : globalMinimumCut;
    iteration++;
  }
  console.info(`the minimum cut is ${globalMinimumCut}`);
})();
