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
    if (this.getSize() === 0) {
      return undefined;
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
export class MedianCalculator {
  private heapL: Heap;
  private heapH: Heap;
  private medians: number[];

  constructor() {
    this.heapL = new Heap();
    this.heapH = new Heap();
    this.medians = [];
  }

  public addNumber(number: number) {
    const numberNum = Number(number);
    numberNum > -1 * (this.heapL.getMinValue() ?? 0)
      ? this.heapH.insertNode(numberNum)
      : this.heapL.insertNode(numberNum * -1);

    this.adjustHeapSizes();
    let newMedian: number;
    if (this.medians.length % 2 === 0) {
      newMedian =
        this.heapL.getSize() > this.heapH.getSize()
          ? -1 * this.heapL.getMinValue()
          : this.heapH.getMinValue();
    } else {
      newMedian = -1 * this.heapL.getMinValue();
    }
    this.medians.push(newMedian);
  }

  public getMedians() {
    return this.medians;
  }

  private adjustHeapSizes() {
    while (this.heapH.getSize() > this.heapL.getSize() + 1) {
      this.heapL.insertNode(-1 * this.heapH.extractMin()!);
    }
    while (this.heapL.getSize() > this.heapH.getSize() + 1) {
      this.heapH.insertNode(-1 * this.heapL.extractMin()!);
    }
  }
}
