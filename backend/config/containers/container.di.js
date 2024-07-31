const { register, get } = require("./dependencyRegistry.di.container");

// Import individual DI containers
require("./branch.di.container");

// Export the main container with registered dependencies
module.exports = {
  register,
  get,
};
