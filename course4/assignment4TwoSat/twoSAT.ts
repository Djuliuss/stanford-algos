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
  let candidate = new Array(numberVariables);
  for (let iteration = 1; iteration <= numberIterations; iteration++) {
    candidate.fill(generateRandomBinaryValue());
    let counter = 1;
    const targetCounter = 2 * Math.pow(clauses.length, 2);
    while (
      counter <= targetCounter &&
      !satisfiesAllClauses(candidate, clauses)
    ) {
      const unsatisfiedClauses = getUnsatisfiedClauses(candidate, clauses);
      unsatisfiedClauses.forEach((clause) =>
        adjustCandidate(candidate, clause)
      );
      counter++;
    }
    if (satisfiesAllClauses(candidate, clauses)) {
      iteration > 1 && console.info(`HEY`);
      break;
    }
  }
  return satisfiesAllClauses(candidate, clauses) ? 1 : 0;
};
