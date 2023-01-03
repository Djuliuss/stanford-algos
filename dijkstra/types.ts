export interface Arc {
  head: number;
  length: number;
}

export interface Graph {
  [vortexId: number]: Arc[];
}
