const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/async.handler.middleware");

router.get(
  "/signin",
  asyncHandler((req, res) => {
    res.send("signin");
  })
);

module.exports = router;
