export type PivotSelecter = (arr: number[]) => number;

export function selectPivot(f: PivotSelecter, arr: number[]) {
  return f(arr);
}

export interface NumberObject {
  number: number;
}
