export interface job {
  length: number;
  weight: number;
}

export type JobSorter = (a: job, b: job) => number;
