import { Tree } from "./types";

export function getPositionsMap(trees: Tree[]) {
  const positionsMap: Map<number, number[]> = new Map();
  trees.forEach((tree, index) => {
    const frequency = tree.getTopNode().frequency;
    if (
      positionsMap.has(frequency) &&
      positionsMap.get(frequency)!.length > 0
    ) {
      const existing = positionsMap.get(frequency)!;
      const updated = [...existing, index];
      positionsMap.set(frequency, updated);
    } else {
      positionsMap.set(frequency, [index]);
    }
  });
  return positionsMap;
}
