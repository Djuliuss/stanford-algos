export interface Arc {
  head: number;
  length: number;
}

export interface Vortex {
  vortexId: number;
  arcs: Arc[];
}

export interface Graph {
  vertices: Vortex[];
}
