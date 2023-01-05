function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export class Graph {
  edges: { [vortex: number]: number[] };
  nextVortex: number;
  constructor() {
    this.edges = {};
    this.nextVortex = 1;
  }

  public addVortex(vortex: number, adjacents: number[]) {
    if (vortex !== this.nextVortex) {
      throw new Error(`invalid vortex number`);
    }
    this.edges[vortex] = adjacents;
    this.nextVortex++;
  }

  // JD!!!
  // needs to be improved. it should probably work out the data without tampering with the initial values
  public workOutMinimumCut() {
    while (this.getAllVertices().length > 2) {
      this.contractRandomEdge();
    }
    return this.edges[this.getAllVertices()[0]].length;
  }

  private contractRandomEdge() {
    const { vortexArandomEdge, vortexBrandomEdge } = this.getRandomEdge();
    const edgesBeginningInVortexA = this.edges[vortexArandomEdge];
    const edgesBeginningInVortexB = this.edges[vortexBrandomEdge];
    const edgesNewSuperNode = [
      ...edgesBeginningInVortexA,
      ...edgesBeginningInVortexB,
    ].filter((e) => ![vortexArandomEdge, vortexBrandomEdge].includes(e));
    const newSuperNode = this.nextVortex;
    this.addVortex(newSuperNode, edgesNewSuperNode);
    // delete (this.edges as any).vortexArandomEdge;
    // delete (this.edges as any).vortexBrandomEdge;
    const newEdges: { [vortex: number]: number[] } = {};
    this.getAllVertices().forEach((e) => {
      if (![vortexArandomEdge, vortexBrandomEdge].includes(e)) {
        newEdges[e] = this.edges[e];
      }
    });
    this.edges = newEdges;

    this.getAllVertices().forEach((e) => {
      if (e !== newSuperNode) {
        this.replaceVortexEdgeValues(e, vortexArandomEdge, newSuperNode);
        this.replaceVortexEdgeValues(e, vortexBrandomEdge, newSuperNode);
      }
    });
  }

  private getRandomEdge() {
    const ramomIndexVortexA = getRandomInt(this.getAllVertices().length);
    const randomVortexA = this.getAllVertices()[ramomIndexVortexA];
    const randomIndexVortexB = getRandomInt(this.edges[randomVortexA].length);
    const randomVortexB = this.edges[randomVortexA][randomIndexVortexB];
    return {
      vortexArandomEdge: randomVortexA,
      vortexBrandomEdge: randomVortexB,
    };
  }

  private replaceVortexEdgeValues(
    vortex: number,
    oldEdge: number,
    newEdge: number
  ) {
    this.edges[vortex] = this.edges[vortex].map((e) =>
      e === oldEdge ? newEdge : e
    );
  }

  private getAllVertices() {
    return Object.keys(this.edges).map(Number);
  }
}
