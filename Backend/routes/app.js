const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data: products } = await axios.get(
      "http://localhost:3000/api/products",
    );

    const totalProducts = products.length;

    const phonesCount = products.filter((p) => p.category === "phone").length;
    const laptopsCount = products.filter((p) => p.category === "laptop").length;
    const tabletsCount = products.filter((p) => p.category === "tablet").length;

    res.render("Home", {
      totalProducts,
      phonesCount,
      laptopsCount,
      tabletsCount,
    });
  } catch (error) {
    console.log(error);

    res.render("Home", {
      totalProducts: 0,
      phonesCount: 0,
      laptopsCount: 0,
      tabletsCount: 0,
    });
  }
});
module.exports = router;
