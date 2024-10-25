const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Owners page is working perfectly fine");
});

module.exports = router;
