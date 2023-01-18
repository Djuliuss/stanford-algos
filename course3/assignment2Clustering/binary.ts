interface StatesN {
  0?: string[];
  1?: string[];
  2?: string[];
}

interface StatesByLength {
  [length: number]: StatesN;
}

const statesByLength: StatesByLength = {};

export const getStatesByNOnes = (length: number, n: 0 | 1 | 2) => {
  if (statesByLength[length]?.[n]) {
    return statesByLength[length][n];
  } else {
    const states = generateStates(length, n);
    if (!statesByLength[length]) {
      statesByLength[length] = { [n]: states };
    } else {
      statesByLength[length][n] = states;
    }
    return statesByLength[length][n];
  }
};

const generateStates = (length: number, numberOnes: number) => {
  if (length === numberOnes) {
    return ["1".repeat(length)];
  } else {
    const childrenStates = generateStates(length - 1, numberOnes);
    console.info(`doing ${length}`);
    let response: string[] = [];
    const map = new Map();
    childrenStates.forEach((childrenState) => {
      for (let index = 0; index <= childrenState.length; index++) {
        const array = childrenState.split("");
        array.splice(index, 0, "0");
        const item = array.join("");
        if (!map.has(item)) {
          response.push(item);
          map.set(item, true);
        }
      }
    });
    return response;
  }
};

export const calculatePoint = (a: string, b: string, length: number) =>
  (parseInt(a, 2) ^ parseInt(b, 2)).toString(2).padStart(length, "0");
