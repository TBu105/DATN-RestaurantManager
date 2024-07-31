const bindClassMethod = (classInstance) => {
  const boundMethods = {};

  Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance))
    .filter((method) => method !== "constructor")
    .forEach((method) => {
      boundMethods[method] = classInstance[method].bind(classInstance);
    });

  return boundMethods;
};

module.exports = bindClassMethod;
