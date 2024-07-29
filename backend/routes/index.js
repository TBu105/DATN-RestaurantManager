const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth/index"));
router.use("/branches", require("./branch/index"));
router.use("/uploads", require("./upload/index"));

module.exports = router;
