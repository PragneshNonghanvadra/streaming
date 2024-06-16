const express = require("express");

const router = express.Router();

router.route("/test").get(async (req, res) => {
  return res.status(200).json({ message: "Welcome to the test" });
});

module.exports = router;
