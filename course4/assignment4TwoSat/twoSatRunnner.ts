import { getTwoSatFromFile } from "./twoSAT";

(async () => {
  const response1 = (
    await getTwoSatFromFile(
      `/Users/julio/algorithms/course4/assignment4TwoSat/2sat1.txt`
    )
  ).toString();
  console.error(
    `JD!!! twoSatRunnner.ts 7. The value of response1 is ${JSON.stringify(
      response1,
      null,
      2
    )} `
  );

  const response2 = (
    await getTwoSatFromFile(
      `/Users/julio/algorithms/course4/assignment4TwoSat/2sat2.txt`
    )
  ).toString();
  console.error(
    `JD!!! twoSatRunnner.ts 18. The value of response2 is ${JSON.stringify(
      response2,
      null,
      2
    )} `
  );

  const response3 = (
    await getTwoSatFromFile(
      `/Users/julio/algorithms/course4/assignment4TwoSat/2sat3.txt`
    )
  ).toString();
  console.error(
    `JD!!! twoSatRunnner.ts 29. The value of response3 is ${JSON.stringify(
      response3,
      null,
      2
    )} `
  );

  const response4 = (
    await getTwoSatFromFile(
      `/Users/julio/algorithms/course4/assignment4TwoSat/2sat4.txt`
    )
  ).toString();
  console.error(
    `JD!!! twoSatRunnner.ts 34. The value of response4 is ${JSON.stringify(
      response4,
      null,
      2
    )} `
  );

  const response5 = (
    await getTwoSatFromFile(
      `/Users/julio/algorithms/course4/assignment4TwoSat/2sat5.txt`
    )
  ).toString();
  console.error(
    `JD!!! twoSatRunnner.ts 51. The value of response5 is ${JSON.stringify(
      response5,
      null,
      2
    )} `
  );

  const response6 = (
    await getTwoSatFromFile(
      `/Users/julio/algorithms/course4/assignment4TwoSat/2sat6.txt`
    )
  ).toString();
  console.error(
    `JD!!! twoSatRunnner.ts 63. The value of response6 is ${JSON.stringify(
      response6,
      null,
      2
    )} `
  );

  const response =
    response1 + response2 + response3 + response4 + response5 + response6;
  console.error(
    `JD!!! twoSatRunnner.ts 25. The value of response is ${JSON.stringify(
      response,
      null,
      2
    )} `
  );
})();
