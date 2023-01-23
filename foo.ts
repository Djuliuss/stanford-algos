let i = 1;
const foo = () => {
  console.info(++i);
  foo();
};
foo();
