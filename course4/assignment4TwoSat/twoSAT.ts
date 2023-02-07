import { clause } from "./types";
import {
  adjustCandidate,
  generateRandomBinaryValue,
  getUnsatisfiedClauses,
  pickRandomClause,
  satisfiesAllClauses,
} from "./utils";

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
  return satisfiesAllClauses(candidate as any, clauses) ? 1 : 0;
};
