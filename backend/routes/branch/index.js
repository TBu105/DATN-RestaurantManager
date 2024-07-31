const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");
const bindClassMethod = require("../../utils/bind.class.method.util");
const { get } = require("../../config/containers/container.di");

const branchController = get("branchController");
const boundBranchController = bindClassMethod(branchController);

router.post("/", asyncHandler(boundBranchController.createBranch));
router.get("/", asyncHandler(boundBranchController.getBranches));

router.get(
  "/branch/:branchId",
  asyncHandler(boundBranchController.getBranchById)
);
router.patch(
  "/branch/:branchId",
  asyncHandler(boundBranchController.updateBranchById)
);

router.patch(
  "/branch/delete/:branchId",
  asyncHandler(boundBranchController.deleteBranchById)
);

router.get("/branch", asyncHandler(boundBranchController.getBranchByFields));

module.exports = router;
