const express = require("express");
const router = express();
const productModel = require("../models/Products");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  const laptops = await productModel.find({ productType: "laptop" });
  res.render("Laptops", { laptops });
});

module.exports = router;
