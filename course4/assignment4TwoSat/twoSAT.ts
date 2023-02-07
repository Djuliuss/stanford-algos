import { clause } from "./types";
import {
  adjustCandidate,
  generateRandomBinaryValue,
  getUnsatisfiedClauses,
  pickRandomClause,
  reduceClauses,
  satisfiesAllClauses,
} from "./utils";
const nReadlines = require("n-readlines");

export const getTwoSatFromFile = async (filename: string) => {
  const clauses: clause[] = [];
  const broadbandLines = new nReadlines(filename);
  let line = broadbandLines.next();
  const numberVariables = Number(line.toString("ascii"));
  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" ").map(Number); //  with spaces.
    clauses.push([numbersRow[0], numbersRow[1]]);
  }
  return getTwoSat(numberVariables, reduceClauses(clauses), filename);
};

const getTwoSat = (
  numberVariables: number,
  clauses: clause[],
  filename: string
) => {
  const numberIterations = Math.floor(Math.log2(numberVariables));
  let candidate: any;
  for (let iteration = 1; iteration <= numberIterations; iteration++) {
    candidate = new Array(numberVariables).fill(generateRandomBinaryValue());
    let counter = 1;
    const targetCounter = 2 * Math.pow(clauses.length, 2);
    while (
      counter <= targetCounter &&
      !satisfiesAllClauses(candidate, clauses)
    ) {
      const unsatisfiedClauses = getUnsatisfiedClauses(candidate, clauses);
      // if (counter % 1000 === 0) {
      //   console.info(
      //     `filename: ${filename.substring(
      //       filename.length - 25,
      //       filename.length
      //     )} iteration ${iteration} counter ${counter} targetCounter ${targetCounter} unsatisfied clauses ${
      //       unsatisfiedClauses.length
      //     }`
      //   );
      // }
      // const randomClause = pickRandomClause(unsatisfiedClauses);
      unsatisfiedClauses.forEach((clause) =>
        adjustCandidate(candidate, clause)
      );
      // adjustCandidate(candidate, randomClause);
      counter++;
    }
    if (satisfiesAllClauses(candidate, clauses)) {
      break;
    }
  }
  // JD!!!
  // any
  return satisfiesAllClauses(candidate as any, clauses) ? 1 : 0;
};
