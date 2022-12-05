function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

interface Vortex {
  adjacents: number[];
  subVertices: Vortex[];
}

class Graph {
  vertices: { [key: number]: Vortex };
  constructor() {
    this.vertices = {};
  }

  public addVortex(number: number, adjacents: number[]) {
    if (this.vertices[number]) {
      throw new Error(`This node already exists in the graph`);
    }
    this.vertices[number] = { adjacents, subVertices: [] };
  }

  public contractEdge() {
    // 1 Select an edge randomly
    const randomVortexNumber = getRandomInt(Object.keys(this.vertices).length);
    const adjacentsFromRandomVortex =
      this.vertices[randomVortexNumber].adjacents;
    const randomAdjacentIndex = getRandomInt(adjacentsFromRandomVortex.length);
    const randomAdjacent = adjacentsFromRandomVortex[randomAdjacentIndex];

    // 2 FuseEdge
    // 2.1 remove Edge from Vortex A
    this.vertices[randomVortexNumber].adjacents =
      adjacentsFromRandomVortex.filter(
        (_, index) => index !== randomAdjacentIndex
      );
    // 2.2 remove Edge from Vortex B
    const adjacentsVortexB = this.vertices[randomAdjacent].adjacents;
    this.vertices[randomAdjacent].adjacents = adjacentsVortexB.filter(
      (vortex) => vortex !== randomVortexNumber
    );
  }
}
