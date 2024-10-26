const express = require("express");
const router = express();
const productModel = require("../models/Products");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const phones = await productModel.find({ productType: "phone" });
    console.log("done");
    return res.render("Phones", { phones });
  } catch (error) {
    console.error("Error fetching phones:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/test", (req, res) => {
  res.render("test"); // Create a simple test.ejs file to see if rendering works
});

module.exports = router;
