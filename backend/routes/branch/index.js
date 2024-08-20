const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");
const branchController = require("../../controllers/branch.controller");
const authorize = require("../../middleware/authorize.middleware");

router.post(
  "/",
  authorize("staff"),
  asyncHandler(branchController.createBranch)
);

router.get("/", authorize("staff"), asyncHandler(branchController.getBranches));

router.get(
  "/branch/:branchId",
  authorize("staff"),
  asyncHandler(branchController.getBranchById)
);
router.patch(
  "/branch/:branchId",
  authorize("staff"),
  asyncHandler(branchController.updateBranchById)
);

router.patch(
  "/branch/delete/:branchId",
  authorize("staff"),
  asyncHandler(branchController.deleteBranchById)
);

router.get("/branch", asyncHandler(branchController.getBranchByFields));

module.exports = router;
