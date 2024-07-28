const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth/index"));
router.use("/branches", require("./branch/index"));

module.exports = router;
