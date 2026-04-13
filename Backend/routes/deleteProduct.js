const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");
const mongoose = require("mongoose");

router.get("/product", (req, res) => {
  res.render("Delete");
});

router.post("/product", async (req, res) => {
  const { productType, productName, productId } = req.body;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send(`
      <script>
        alert('Invalid Product ID format. Please check the ID and try again.');
        window.location.href = '/delete/product';
      </script>
    `);
  }

  try {
    // Don't modify the name - compare as is or handle case-insensitive
    // Better approach: use regex for case-insensitive match or keep as is
    const query = {
      _id: productId,
      productType: productType,
    };

    // Optional: Add name check for extra verification (case-insensitive)
    if (productName && productName.trim()) {
      query.name = { $regex: new RegExp(`^${productName.trim()}$`, "i") };
    }

    const result = await productModel.deleteOne(query);

    if (result.deletedCount > 0) {
      // Success - redirect with success message
      return res.send(`
        <script>
          alert('✓ Product deleted successfully!');
          window.location.href = '/';
        </script>
      `);
    } else {
      // Not found - show error message
      return res.status(404).send(`
        <script>
          alert('❌ Product not found. Please check the Product ID and Name.');
          window.location.href = '/delete/product';
        </script>
      `);
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).send(`
      <script>
        alert('❌ Server error occurred while deleting. Please try again.');
        window.location.href = '/delete/product';
      </script>
    `);
  }
});

module.exports = router;
