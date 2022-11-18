const function1 = () => {
  console.info(`a`);
  console.info(`a`);
  console.info(`a`);
  console.info(`a`);
  console.info(`a`);
  function2();
  console.info(`a`);
  console.info(`a`);
  console.info(`a`);
};

const function2 = () => {
  console.info("xx");
  console.info("xx");
  console.info("xx");
  console.info("xx");
  console.info("xx");
  console.info("xx");
};

function1();
console.info("asdf");
