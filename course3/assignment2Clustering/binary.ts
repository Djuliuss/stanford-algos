interface States {
  [key: number]: string[];
}

const statesOneOne: States = {};
const statesTwoOnes: States = {};

export const getStatesWithOneOne = (length: number) => {
  if (statesOneOne[length]) {
    return statesOneOne[length];
  } else {
    statesOneOne[length] = generateStates(length, 1);
    return statesOneOne[length];
  }
};

export const getStatesWithTwoOnes = (length: number) => {
  if (statesTwoOnes[length]) {
    return statesTwoOnes[length];
  } else {
    statesTwoOnes[length] = generateStates(length, 2);
    return statesTwoOnes[length];
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

export const calculatePoint = (a: string, b: string) =>
  (parseInt(a, 2) ^ parseInt(b, 2)).toString(2);
