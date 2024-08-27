const express = require("express");
const router = express.Router();
const authorize = require("../../middleware/authorize.middleware");
const { uploadDisk } = require("../../config/multer.config");
const asyncHandler = require("../../middleware/async.handler.middleware");
const tableController = require("../../controllers/table.controller");

router.post("/", authorize("staff"), uploadDisk.none(), asyncHandler(tableController.createTable));
router.get("/", authorize("staff"), asyncHandler(tableController.getTables));

router.get("/table/:tableId", authorize("staff"), asyncHandler(tableController.getTableById));
router.patch(
  "/table/:tableId",
  asyncHandler(tableController.updateTableById)
);

router.patch(
  "/table/delete/:tableId", authorize("staff"),
  asyncHandler(tableController.deleteTableById)
);
router.get("/table", authorize("staff"), asyncHandler(tableController.getTableByFields));

module.exports = router;
