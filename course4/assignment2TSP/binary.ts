interface StatesN {
  [k: number]: string[];
}

interface StatesByLength {
  [length: number]: StatesN;
}

const statesByLength: StatesByLength = {};

export const getStatesByNOnes = (length: number, n: number) => {
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

export const generateBinaryNumbers = (length: number): string[] => {
  if (length === 0) {
    return [];
  }

  if (length === 1) {
    return ["0", "1"];
  }

  const result: string[] = [];
  const previous = generateBinaryNumbers(length - 1);
  for (const item of previous) {
    result.push(`0${item}`);
    result.push(`1${item}`);
  }

  return result;
};

export function getNumberOnes(binaryString: string): number {
  let count = 0;
  for (const char of binaryString) {
    if (char === "1") {
      count++;
    }
  }
  return count;
}

export const binaryToPositions = (str: string): number[] => {
  const positions = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "1") {
      positions.push(i);
    }
  }
  return positions;
};

export function setBitToZero(binary: string, position: number): string {
  let result = "";
  for (let i = 0; i < binary.length; i++) {
    if (i === position) {
      result = result + "0";
    } else {
      result = result + binary[i];
    }
  }
  return result;
}
