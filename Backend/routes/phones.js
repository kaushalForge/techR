const express = require("express");
const router = express();
const productModel = require("../models/Products");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const phones = await productModel.find({ productType: "phone" });
    return res.render("Phones", { phones });
  } catch (error) {
    console.log("Error fetching phones:", error);
    return res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
