const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");
const { uploadDisk } = require("../../config/multer.config");
const authController = require("../../controllers/auth.controller");

router.post("/register", asyncHandler(authController.createUser));

router.post("/login", asyncHandler(authController.login));

router.post("/logout", asyncHandler(authController.logout));

router.post("/refresh-token", asyncHandler(authController.refreshAccessToken));

module.exports = router;
