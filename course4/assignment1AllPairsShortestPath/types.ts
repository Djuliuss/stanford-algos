export interface EdgeVortex {
  head: number;
  length: number;
}

export interface Graph {
  [vortexId: number]: EdgeVortex[];
}

export const INFINITY = 999999999;
