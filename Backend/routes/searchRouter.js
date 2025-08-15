const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;

    const results = await productModel.find({
      name: { $regex: searchTerm, $options: "i" },
    });

    if (results.length > 0) {
      return res.json(results);
    } else {
      return res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error searching products:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
