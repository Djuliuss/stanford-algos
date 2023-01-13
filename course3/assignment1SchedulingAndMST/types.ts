export interface job {
  length: number;
  weight: number;
}

export type JobSorter = (a: job, b: job) => number;

export interface EdgeVortex {
  vortexId: number;
  length: number;
}

export interface Graph {
  [vortexId: number]: EdgeVortex[];
}

export interface Vortex {
  vortexId: number;
}

export type VortexSet = Vortex[];

export interface Edge {
  u: number;
  v: number;
  length: number;
}

export type EdgeSet = Edge[];
