const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");
const authorize = require("../../middleware/authorize.middleware");
const userController = require("../../controllers/user.controller");

router.patch(
  "/:userId",
  authorize("staff"),
  asyncHandler(userController.updateUserById)
);

router.get("/:userId", authorize("staff"), asyncHandler(userController.getUserById));

router.get("/",asyncHandler(userController.getUsers));

module.exports = router;
