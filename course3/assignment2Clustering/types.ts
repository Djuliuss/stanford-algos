export interface edge {
  node1: number;
  node2: number;
  cost: number;
}

interface objectSet {
  leader: number;
  size: number;
}

interface objectObjects {
  [key: number]: { leader: number; size: number };
}

export class UnionFindArray {
  private objects: objectSet[] = [];
  private numberClusters = 0;
  constructor(numberNodes: number) {
    for (let index = 0; index < numberNodes; index++) {
      this.objects.push({ leader: index, size: 1 });
    }
    this.numberClusters = numberNodes;
  }

  // each set is determined by its leader.

  public find(object: number) {
    return this.findByIndex(object - 1);
  }

  public getNumberClusters() {
    return this.numberClusters;
  }

  public union(objectSetA: number, objectSetB: number) {
    const { leader: setA, size: sizeA } = this.objects[this.find(objectSetA)];
    const { leader: setB, size: sizeB } = this.objects[this.find(objectSetB)];
    if (setA === setB) {
      //continue
    } else if (sizeA >= sizeB) {
      this.objects[setB].leader = setA;
      this.objects[setA].size += sizeB;
      this.numberClusters--;
    } else {
      this.objects[setA].leader = setB;
      this.objects[setB].size += sizeA;
      this.numberClusters--;
    }
    return;
  }

  private findByIndex(index: number) {
    let { leader } = this.objects[index];
    while (leader !== index) {
      index = leader;
      ({ leader } = this.objects[index]);
    }
    return leader;
  }
}

export class UnionFindObject {
  private objects: objectObjects = {};
  private numberClusters = 0;
  constructor(edges: edge[]) {
    edges.forEach(({ node1, node2 }) => {
      if (!this.objects[node1 - 1]) {
        this.objects[node1 - 1] = { leader: node1 - 1, size: 1 };
      }
      if (!this.objects[node2 - 1]) {
        this.objects[node2 - 1] = { leader: node2 - 1, size: 1 };
      }
    });
    this.numberClusters = Object.keys(this.objects).length;
  }

  // each set is determined by its leader.

  public find(object: number) {
    return this.findByIndex(object - 1);
  }

  public getNumberClusters() {
    return this.numberClusters;
  }

  public union(objectSetA: number, objectSetB: number) {
    const { leader: setA, size: sizeA } = this.objects[this.find(objectSetA)];
    const { leader: setB, size: sizeB } = this.objects[this.find(objectSetB)];
    if (setA === setB) {
      //continue
    } else if (sizeA >= sizeB) {
      this.objects[setB].leader = setA;
      this.objects[setA].size += sizeB;
      this.numberClusters--;
    } else {
      this.objects[setA].leader = setB;
      this.objects[setB].size += sizeA;
      this.numberClusters--;
    }
    return;
  }

  private findByIndex(index: number) {
    let { leader } = this.objects[index];
    while (leader !== index) {
      index = leader;
      ({ leader } = this.objects[index]);
    }
    return leader;
  }
}
