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

function generateStates(n: number, num: number) {
  var states = [];

  // Convert to decimal
  var maxDecimal = parseInt("1".repeat(n), 2);

  // For every number between 0->decimal
  for (var i = 0; i <= maxDecimal; i++) {
    // Convert to binary, pad with 0, and add to final results
    const candidate = i.toString(2).padStart(n, "0");
    if (numberOnes(candidate) === num) {
      states.push(candidate);
    }
  }

  return states;
}

function numberOnes(str: string) {
  let numberOnes = 0;
  const array = str.split("");
  array.forEach((e) => {
    if (e === "1") {
      numberOnes++;
    }
  });
  return numberOnes;
}

export const calculatePoint = (a: string, b: string, length: number) =>
  (parseInt(a, 2) ^ parseInt(b, 2)).toString(2).padStart(length, "0");
