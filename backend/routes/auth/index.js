const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");
const { uploadDisk } = require("../../config/multer.config");
const authController = require("../../controllers/auth.controller");

router.post(
  "/register",
  uploadDisk.none(),
  asyncHandler(authController.createUser)
);

router.post("/login", uploadDisk.none(), asyncHandler(authController.login));

router.post("/logout", uploadDisk.none(), asyncHandler(authController.logout));

router.post(
  "/refresh-token",
  uploadDisk.none(),
  asyncHandler(authController.refreshAccessToken)
);

module.exports = router;
