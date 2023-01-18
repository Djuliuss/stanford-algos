export interface symbolFile {
  symbol: string;
  frequency: number;
}

export interface nodeSymbol {
  label?: string;
  leftChild?: nodeSymbol;
  rightChild?: nodeSymbol;
  frequency: number;
}

export class Tree {
  private topNode: nodeSymbol;
  constructor(node: nodeSymbol) {
    this.topNode = node;
  }

  /**
   * getTopNode
   */
  public getTopNode() {
    return this.topNode;
  }
}

export const mergeTrees = (treeA: Tree, treeB: Tree) => {
  const topNodeA = treeA.getTopNode();
  const topNodeB = treeB.getTopNode();
  const topNodeNewTree = {
    leftChild: topNodeB,
    rightChild: topNodeA,
    frequency: topNodeA.frequency + topNodeB.frequency,
  };
  return new Tree(topNodeNewTree);
};

const INFINITY = 9999999999;

export class Heap {
  private nodes: number[];
  constructor() {
    this.nodes = [];
  }
  public getSize() {
    return this.nodes.length;
  }

  public getMinValue() {
    return this.getNodeValue(1);
  }

  public getNodeValue(node: number) {
    return this.nodes[node - 1];
  }

  public insertNode(value: number) {
    this.nodes.push(value);
    let newNodePosition: number = this.getSize() - 1;
    let parentIndex = this.getParentIndex(newNodePosition!);
    let parentIndexValue =
      parentIndex || parentIndex === 0
        ? this.getIndexValue(parentIndex)
        : undefined;
    while (parentIndexValue && parentIndexValue > value) {
      this.swapNodes(parentIndex!, newNodePosition);
      newNodePosition = parentIndex!;
      parentIndex = this.getParentIndex(newNodePosition!);
      parentIndexValue =
        parentIndex || parentIndex === 0
          ? this.getIndexValue(parentIndex)
          : undefined;
    }
  }

  public extractMin() {
    console.error("JD!!! I AM HERE at types.ts 77");

    if (this.getSize() === 0) {
      return undefined;
    }
    if (this.getSize() === 1) {
      return this.nodes.pop();
    }
    const extractedMin = this.nodes[0];
    this.swapNodes(0, this.nodes.length - 1);
    this.nodes.pop();
    let nodeIndexToBubbleDown = 0;
    let nodeValueToBubbleDown = this.getIndexValue(nodeIndexToBubbleDown);
    let { rightChildIndex, rightChildValue, leftChildIndex, leftChildValue } =
      this.getChildrenIndexAndValues(nodeIndexToBubbleDown);
    let stop = false;
    while (!stop) {
      const { smallerChildIndex, smallerChildValue } =
        this.determineSmallerChild({
          rightChildIndex,
          rightChildValue,
          leftChildIndex,
          leftChildValue,
        });
      if (nodeValueToBubbleDown <= smallerChildValue) {
        stop = true;
      } else {
        this.swapNodes(smallerChildIndex!, nodeIndexToBubbleDown);
        nodeIndexToBubbleDown = smallerChildIndex!;
        ({ rightChildIndex, rightChildValue, leftChildIndex, leftChildValue } =
          this.getChildrenIndexAndValues(nodeIndexToBubbleDown));
      }
    }
    return extractedMin;
  }

  private getChildrenIndexAndValues(nodeIndex: number) {
    let { leftChildIndex, rightChildIndex } =
      this.getChildrenIndexes(nodeIndex);
    let [leftChildValue, rightChildValue] = [
      leftChildIndex ? this.getIndexValue(leftChildIndex) : INFINITY,
      rightChildIndex ? this.getIndexValue(rightChildIndex) : INFINITY,
    ];
    return { leftChildIndex, rightChildIndex, leftChildValue, rightChildValue };
  }

  private determineSmallerChild(params: {
    rightChildValue: number;
    rightChildIndex: number | undefined;
    leftChildValue: number;
    leftChildIndex: number | undefined;
  }) {
    const { leftChildIndex, leftChildValue, rightChildIndex, rightChildValue } =
      params;
    let largerChildValue,
      largerChildIndex,
      smallerChildValue,
      smallerChildIndex;
    if (leftChildValue <= rightChildValue) {
      smallerChildIndex = leftChildIndex;
      smallerChildValue = leftChildValue;
      largerChildIndex = rightChildIndex;
      largerChildValue = rightChildValue;
    } else {
      smallerChildIndex = rightChildIndex;
      smallerChildValue = rightChildValue;
      largerChildIndex = leftChildIndex;
      largerChildValue = leftChildValue;
    }
    return {
      smallerChildIndex,
      smallerChildValue,
      largerChildIndex,
      largerChildValue,
    };
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
    let leftChildIndex =
      nodePosition * 2 + 1 > this.getSize() - 1
        ? undefined
        : nodePosition * 2 + 1;
    let rightChildIndex =
      nodePosition * 2 + 2 > this.getSize() - 1
        ? undefined
        : nodePosition * 2 + 2;
    return { leftChildIndex, rightChildIndex };
  }

  private swapNodes(nodeIndex1: number, nodePosition2: number) {
    const aux = this.nodes[nodePosition2];
    this.nodes[nodePosition2] = this.nodes[nodeIndex1];
    this.nodes[nodeIndex1] = aux;
  }
}
