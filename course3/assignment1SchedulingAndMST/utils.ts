import { job, JobSorter } from "./types";

export const sortByDifference: JobSorter = (a: job, b: job) => {
  const { length: lengthA, weight: weightA } = a;
  const { length: lengthB, weight: weightB } = b;
  const differenceA = weightA - lengthA;
  const differenceB = weightB - lengthB;
  const weightAIsLarger = weightA > weightB;
  if (differenceA === differenceB) {
    return weightAIsLarger ? -1 : 1;
  } else {
    return differenceB - differenceA;
  }
};

export const sortByRatio: JobSorter = (a: job, b: job) => {
  const { length: lengthA, weight: weightA } = a;
  const { length: lengthB, weight: weightB } = b;
  const ratioA = weightA / lengthA;
  const ratioB = weightB / lengthB;
  return ratioB - ratioA;
};
