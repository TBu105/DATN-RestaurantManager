const { NotFound } = require("../../core/error.response");

const containerDI = new Map();

const register = (key, factoryFunction) => {
  containerDI.set(key, {
    factory: factoryFunction,
    isSingleton: false,
  });
};

const registerSingleton = (key, factoryFunction) => {
  containerDI.set(key, {
    factory: factoryFunction,
    isSingleton: true,
    instance: null,
  });
};

const get = (key) => {
  const entry = containerDI.get(key);

  if (!entry) {
    throw new NotFound(`Dependency ${key} is not registered`);
  }

  if (entry.isSingleton) {
    if (entry.instance === null) {
      entry.instance = entry.factory();
      console.log(`Created singleton instance for ${key}`);
    }
    return entry.instance;
  } else {
    const instance = entry.factory();
    console.log(`Created new instance for ${key}`);
    return instance;
  }
};

const reset = () => {
  containerDI.clear();
};

module.exports = { register, registerSingleton, get, reset };
