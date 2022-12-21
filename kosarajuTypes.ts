export interface DirectedGraph {
  [node: number]: number[];
}

export interface FinishingTimes {
  [node: number]: number;
}

export interface LeaderVertices {
  [node: number]: number;
}

export interface VortexTreated {
  [node: number]: boolean;
}
