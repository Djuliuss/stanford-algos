import { job, JobSorter } from "./types";

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
