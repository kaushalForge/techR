// routes/admin.js - Admin API (for backend/internal use)
const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

// ADMIN API - Gets ALL products regardless of isPublished
// URL: GET /api/admin/products
router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find({});
    console.log(`✅ Admin API: Found ${products.length} products`);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: error.message });
  }
});

// ADMIN API - Get product by ID (for editing)
// URL: GET /api/admin/product/:id
router.get("/product/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADMIN API - Create product
// URL: POST /api/admin/products
router.post("/products", async (req, res) => {
  try {
    const product = new productModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
