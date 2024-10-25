const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const { addProducts } = require("../controllers/addProductsController");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/addProduct", isLoggedIn, (req, res) => {
  res.render("addProduct");
});

router.post("/addProduct", isLoggedIn, upload.single("image"), addProducts);

module.exports = router;
