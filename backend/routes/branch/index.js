const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");
const branchController = require("../../controllers/branch.controller");

router.post("/", asyncHandler(branchController.createBranch));
router.get("/", asyncHandler(branchController.getBranches));

router.get("/branch/:branchId", asyncHandler(branchController.getBranchById));
router.patch(
  "/branch/:branchId",
  asyncHandler(branchController.updateBranchById)
);

router.patch(
  "/branch/delete/:branchId",
  asyncHandler(branchController.deleteBranchById)
);

router.get("/branch", asyncHandler(branchController.getBranchByFields));

module.exports = router;
