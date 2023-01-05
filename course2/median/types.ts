export class Heap {
  private nodes: number[];
  constructor() {
    this.nodes = [];
  }
  public getSize() {
    return this.nodes.length;
  }

  public getNodeValue(node: number) {
    return this.nodes[node - 1];
  }

  public insertNode(value: number) {
    this.nodes.push(value);
    let newNodePosition: number = this.getSize() - 1;
    let parentIndex = this.getParentIndex(newNodePosition!);
    let parentIndexValue = parentIndex && this.getIndexValue(parentIndex);
    while (parentIndexValue && parentIndexValue > value) {
      this.swapNodes(parentIndex!, newNodePosition);
      newNodePosition = parentIndex!;
      parentIndex = this.getParentIndex(newNodePosition!);
      parentIndexValue = parentIndex && this.getIndexValue(parentIndex);
    }
  }

  private getParentIndex(nodeIndex: number) {
    if (nodeIndex < 0 || nodeIndex > this.getSize() - 1) {
      throw new Error(`Invalid nodeIndex: ${nodeIndex}`);
    }
    if (nodeIndex === 0) {
      return undefined;
    } else if ([1, 2].includes(nodeIndex)) {
      return 0;
    } else {
      return nodeIndex % 2 === 0
        ? nodeIndex / 2 - 1
        : Math.floor(nodeIndex / 2);
    }
  }

  private getIndexValue(nodeIndex: number) {
    if (nodeIndex < 0 || nodeIndex > this.getSize() - 1) {
      throw new Error(
        `Invalid nodeIndex: ${nodeIndex} in method getIndexValue`
      );
    }

    return this.nodes[nodeIndex];
  }

  private getChildrenIndexes(nodePosition: number) {
    let leftChild =
      nodePosition * 2 + 1 > this.getSize() - 1
        ? undefined
        : this.nodes[nodePosition * 2 + 1];
    let rightChild =
      nodePosition * 2 + 2 > this.getSize() - 1
        ? undefined
        : this.nodes[nodePosition * 2 + 2];
    return { leftChild, rightChild };
  }

  private swapNodes(nodeIndex1: number, nodePosition2: number) {
    const aux = this.nodes[nodePosition2];
    this.nodes[nodePosition2] = this.nodes[nodeIndex1];
    this.nodes[nodeIndex1] = aux;
  }
}
