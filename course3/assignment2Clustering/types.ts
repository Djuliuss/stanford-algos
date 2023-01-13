export interface edge {
  node1: number;
  node2: number;
  cost: number;
}

interface objectSet {
  leader: number;
  size: number;
}

export class UnionFind {
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
    return leader;
  }

  public union(objectSetA: number, objectSetB: number) {
    const { leader: setA, size: sizeA } = this.nodes[this.find(objectSetA)];
    const { leader: setB, size: sizeB } = this.nodes[this.find(objectSetB)];
    if (setA === setB) {
      //continue
    } else if (sizeA >= sizeB) {
      this.nodes[setB].leader = setA;
      this.nodes[setA].size += sizeB;
    } else {
      this.nodes[setA].leader = setB;
      this.nodes[setB].size += sizeA;
    }
    return;
  }
}

export interface ClusterDistances {
  [cluster: number]: {
    [cluster: number]: number;
  };
}
