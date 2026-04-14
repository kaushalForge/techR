const express = require("express");
const router = express.Router();
const axios = require("axios"); // You need axios or node-fetch

router.get("/", async (req, res) => {
  const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";

  try {
    // ✅ CORRECT: Use axios.get() instead of fetch
    const { data: products } = await axios.get(`${backendURL}/api/products`);

    const totalProducts = products.length;

    const phonesCount = products.filter((p) => p.category === "phone").length;
    const laptopsCount = products.filter((p) => p.category === "laptop").length;
    const tabletsCount = products.filter((p) => p.category === "tablet").length;

    res.render("Home", {
      totalProducts,
      phonesCount,
      laptopsCount,
      tabletsCount,
      backendURL,
      frontendURL,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    // Still render with fallback data
    res.render("Home", {
      totalProducts: 0,
      phonesCount: 0,
      laptopsCount: 0,
      tabletsCount: 0,
      frontendURL,
      backendURL,
    });
  }
});

module.exports = router;
