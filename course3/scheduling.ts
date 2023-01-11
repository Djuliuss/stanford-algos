import { job, JobSorter } from "./types";
const nReadlines = require("n-readlines");

export const getWeightedCompletedTime = (jobs: job[], jobSorter: JobSorter) => {
  const sortedJobs = jobs.sort(jobSorter);
  let weighCompletedTime = 0;
  let lengthAccumulator = 0;
  sortedJobs.forEach(({ weight, length }) => {
    lengthAccumulator += length;
    weighCompletedTime += lengthAccumulator * weight;
  });
  return weighCompletedTime;
};

const getJobsFromFile = async (filename: string) => {
  const numbers: job[] = [];
  const broadbandLines = new nReadlines(filename);
  let line;
  broadbandLines.next();
  while ((line = broadbandLines.next())) {
    const numberFromFile = line.toString("ascii");
    const numberArray = numberFromFile.split(" ");
    if (numberArray.length === 2) {
      numbers.push({ weight: numberArray[0], length: numberArray[1] });
    }
  }
  return numbers;
};
