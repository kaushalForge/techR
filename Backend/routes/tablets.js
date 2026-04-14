const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  const tablets = await productModel.find({ productType: "tablet" });
  res.render("Tablets", { tablets });
});

module.exports = router;
