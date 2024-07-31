const { registerSingleton, get } = require("./dependencyRegistry.di.container");
const BranchRepository = require("../../models/repositories/branch.repo");
const BranchService = require("../../services/branch.service");
const BranchModel = require("../../models/branch.model");
const BranchController = require("../../controllers/branch.controller");

registerSingleton("branchModel", () => BranchModel);
registerSingleton(
  "branchRepository",
  () => new BranchRepository(get("branchModel"))
);
registerSingleton(
  "branchService",
  () => new BranchService(get("branchRepository"))
);
registerSingleton(
  "branchController",
  () => new BranchController(get("branchService"))
);
