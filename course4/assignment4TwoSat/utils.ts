import { binaryVariables, clause } from "./types";

export const satisfiesClause = (
  binaryVariables: binaryVariables,
  clause: clause
) => {
  const [clause1, clause2] = clause;
  const [index1, index2] = [Math.abs(clause1) - 1, Math.abs(clause2) - 1];
  const [binaryVariable1, binaryVariable2] = [
    binaryVariables[index1],
    binaryVariables[index2],
  ];
  if ([clause1, clause2].includes(0)) {
    throw new Error(`got clause equal to 0`);
  }
  const operand1 =
    (clause1 > 0 && binaryVariable1) || (clause1 < 0 && !binaryVariable1);
  const operand2 =
    (clause2 > 0 && binaryVariable2) || (clause2 < 0 && !binaryVariable2);
  return operand1 || operand2;
};

export const satisfiesAllClauses = (
  binaryVariables: binaryVariables,
  clauses: clause[]
) => clauses.every((clause) => satisfiesClause(binaryVariables, clause));

export const getUnsatisfiedClauses = (
  binaryVariables: binaryVariables,
  clauses: clause[]
) => {
  const unsatisfiedClauses: clause[] = [];
  clauses.forEach((clause) => {
    if (!satisfiesClause(binaryVariables, clause)) {
      unsatisfiedClauses.push(clause);
    }
  });
  return unsatisfiedClauses;
};

export const switchValue = (binaryVariables: binaryVariables, index: number) =>
  (binaryVariables[index] = binaryVariables[index] === 1 ? 0 : 1);

export const generateRandomBinaryValue = () => (Math.random() >= 0.5 ? 1 : 0);

export const pickRandomClause = (clauses: clause[]) => {
  const index = Math.floor(Math.random() * clauses.length);
  return clauses[index];
};

export const adjustCandidate = (
  binaryVariables: binaryVariables,
  clause: clause
) => {
  const [clause1, clause2] = clause;
  const [index1, index2] = [Math.abs(clause1) - 1, Math.abs(clause2) - 1];
  const index = Math.random() >= 0.5 ? 1 : 0;
  switchValue(binaryVariables, [index1, index2][index]);
};
