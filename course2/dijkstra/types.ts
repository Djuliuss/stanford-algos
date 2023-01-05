export interface EdgeVortex {
  head: number;
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
  head: number;
  tail: number;
  length: number;
}

export type EdgeSet = Edge[];
