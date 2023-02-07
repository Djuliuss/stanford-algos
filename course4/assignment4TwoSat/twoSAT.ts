import { clause } from "./types";
import {
  adjustCandidate,
  generateRandomBinaryValue,
  getUnsatisfiedClauses,
  pickRandomClause,
  satisfiesAllClauses,
} from "./utils";
const nReadlines = require("n-readlines");

export const getTwoSatFromFile = async (filename: string) => {
  const clauses: clause[] = [];
  const broadbandLines = new nReadlines(filename);
  // JD!!!
  // ignore first row
  let line = broadbandLines.next();

  while ((line = broadbandLines.next())) {
    const numbersRow = line.toString("ascii").split(" ").map(Number); //  with spaces.
    clauses.push([numbersRow[0], numbersRow[1]]);
  }
  return getTwoSat(clauses);
};

const getTwoSat = (clauses: clause[]) => {
  const numberVariables = clauses.length;
  const numberIterations = Math.floor(Math.log2(numberVariables));
  let candidate;
  for (let iteration = 1; iteration <= numberIterations; iteration++) {
    candidate = new Array(numberVariables).fill(generateRandomBinaryValue());
    let counter = 1;
    while (
      counter <= 2 * Math.pow(numberVariables, 2) &&
      !satisfiesAllClauses(candidate, clauses)
    ) {
      const unsatisfiedClauses = getUnsatisfiedClauses(candidate, clauses);
      const randomClause = pickRandomClause(unsatisfiedClauses);
      adjustCandidate(candidate, randomClause);
      counter++;
    }
  }
  // JD!!!
  // any
  return satisfiesAllClauses(candidate as any, clauses) ? 1 : 0;
};
