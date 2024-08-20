const express = require("express");
const router = express.Router();
const { uploadDisk } = require("../../config/multer.config");
const asyncHandler = require("../../middleware/async.handler.middleware");
const tableController = require("../../controllers/table.controller");

router.post("/", uploadDisk.none(), asyncHandler(tableController.createTable));
router.get("/", asyncHandler(tableController.getTables));

router.get("/table/:tableId", asyncHandler(tableController.getTableById));
router.patch(
  "/table/:tableId",
  asyncHandler(tableController.updateTableById)
);

router.patch(
  "/table/delete/:tableId",
  asyncHandler(tableController.deleteTableById)
);
router.get("/table", asyncHandler(tableController.getTableByFields));

module.exports = router;
