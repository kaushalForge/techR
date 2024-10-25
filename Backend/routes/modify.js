const express = require("express");
const router = express();
const upload = require("../config/multer-config");
const productModel = require("../models/Products");
const { modifyProducts } = require("../controllers/modifyController");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  res.render("modify");
});

router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const find = await productModel.findOne({ _id: id });
    return res.render("modify", { find });
  } catch (error) {
    console.error("Error finding the product:", error);
    return res.redirect("/");
  }
});

router.post("/:id", isLoggedIn, upload.single("image"), modifyProducts);

module.exports = router;
