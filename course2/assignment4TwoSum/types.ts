export class TwoSumCalculator {
  private flags: { [key: number]: boolean } = {};
  constructor(numbers: number[]) {
    numbers.forEach((number) => (this.flags[number] = true));
  }

  /**
   * getTwoSum
   */
  public getTwoSum(target: number) {
    const candidates = Object.keys(this.flags).map(Number);
    let response = false;
    for (let index = 0; index < candidates.length; index++) {
      const x = candidates[index];
      const y = target - x;
      if (x === y) {
        continue;
      }
      if (this.flags[y]) {
        response = true;
        break;
      }
    }
    return response;
  }
}
