const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/", async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.json([]); // always return array
    }

    const results = await productModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { item_categorie: { $regex: searchTerm, $options: "i" } },
        { productType: { $regex: searchTerm, $options: "i" } },
        { dtype: { $regex: searchTerm, $options: "i" } }, //display type
        { resolution: { $regex: searchTerm, $options: "i" } },
        { os: { $regex: searchTerm, $options: "i" } },
        { processor: { $regex: searchTerm, $options: "i" } },
        { graphic: { $regex: searchTerm, $options: "i" } },
        { wifi: { $regex: searchTerm, $options: "i" } },
        { bluetooth: { $regex: searchTerm, $options: "i" } },
        { build: { $regex: searchTerm, $options: "i" } },
        { weight: { $regex: searchTerm, $options: "i" } },
        { maincamera: { $regex: searchTerm, $options: "i" } },
        { frontcamera: { $regex: searchTerm, $options: "i" } },

        // nested array: descriptions.detail
        { "descriptions.detail": { $regex: searchTerm, $options: "i" } },
        { "descriptions.heading": { $regex: searchTerm, $options: "i" } },
      ],
    });

    return res.json(results); // always array
  } catch (error) {
    console.error("Error searching products:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
