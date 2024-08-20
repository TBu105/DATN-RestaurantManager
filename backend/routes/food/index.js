const express = require("express");
const router = express.Router();
const foodController = require("../../controllers/food.controller");
const asyncHandler = require("../../middleware/async.handler.middleware");
const authorize = require("../../middleware/authorize.middleware");

const { uploadDisk } = require("../../config/multer.config");

router.post(
  "/food",
  uploadDisk.none(),
  authorize("staff"),
  asyncHandler(foodController.createFood)
);

router.get("/food/:id", asyncHandler(foodController.getFoodById));

router.get("/food", asyncHandler(foodController.getFoodByFields));

router.get("/", asyncHandler(foodController.getAllFoods));

router.patch(
  "/food/general-info/:id",
  uploadDisk.none(),
  authorize("staff"),
  asyncHandler(foodController.updateFoodGeneralInfoById)
);

router.patch(
  "/food/is-disable/:id",
  authorize("staff"),
  asyncHandler(foodController.disableFoodById)
);

router.patch(
  "/food/:id",
  authorize("staff"),
  asyncHandler(foodController.deleteFoodById)
);

module.exports = router;
