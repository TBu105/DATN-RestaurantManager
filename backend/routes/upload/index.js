const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");
const uploadController = require("../../controllers/upload.controller");
const { uploadDisk } = require("../../config/multer.config");

router.post(
  "/photo",
  uploadDisk.single("file"),
  asyncHandler(uploadController.uploadFile)
);

router.post(
  "/photos",
  uploadDisk.array("files", 10),
  asyncHandler(uploadController.uploadFiles)
);

module.exports = router;
