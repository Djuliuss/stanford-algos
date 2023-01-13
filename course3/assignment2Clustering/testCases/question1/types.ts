interface objectSet {
  leader: number;
  size: number;
}

class UnionFind {
  private nodes: objectSet[] = [];
  constructor(numberNodes: number) {
    for (let index = 0; index < numberNodes; index++) {
      this.nodes.push({ leader: index, size: 1 });
      index++;
    }
  }

  // each set is determined by its leader.

  public find(node: number) {
    let { leader } = this.nodes[node];
    while (leader !== node) {
      node = leader;
      ({ leader } = this.nodes[node]);
    }
    return this.nodes[node];
  }

  public union(nodeA: object, nodeB: object) {}
}
