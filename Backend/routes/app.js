const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";

  try {
    // Fetch products from your backend API
    const response = await axios.get(`${backendURL}/api/admin/products`);
    const products = response.data;

    // Validate that products is an array
    if (!Array.isArray(products)) {
      throw new Error("Invalid products data");
    }

    // Calculate stats based on productType field
    const totalProducts = products.length;

    const phonesCount = products.filter(
      (p) => p.productType === "phone",
    ).length;

    const laptopsCount = products.filter(
      (p) => p.productType === "laptop",
    ).length;

    const tabletsCount = products.filter(
      (p) => p.productType === "tablet",
    ).length;

    console.log(
      `📊 Stats - Total: ${totalProducts}, Phones: ${phonesCount}, Laptops: ${laptopsCount}, Tablets: ${tabletsCount}`,
    );

    res.render("Home", {
      totalProducts,
      phonesCount,
      laptopsCount,
      tabletsCount,
      backendURL,
      frontendURL,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);

    // Log more details for debugging
    if (error.code === "ECONNREFUSED") {
      console.error(`Cannot connect to backend at ${backendURL}`);
    } else if (error.response) {
      console.error(`API responded with status: ${error.response.status}`);
      console.error(`Response data:`, error.response.data);
    }

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
