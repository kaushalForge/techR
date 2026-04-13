const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

// ─── Helpers ────────────────────────────────────────────

const formatProduct = (item) => ({
  _id: item._id,
  name: item.name,
  blog: item.blog,
  image: item.image,
  productType: item.productType,
  price: item.price?.[0]?.[0] ?? "$...",
});

const handleError = (res, error, msg = "Server error") => {
  console.error(msg, error.message);
  res.status(500).json({ message: msg });
};

// ─── All Products ────────────────────────────────────────

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find({ isPublished: true });
    res.json(products);
  } catch (error) {
    handleError(res, error, "Error fetching products");
  }
});

// ─── By Product Type ─────────────────────────────────────

const PRODUCT_TYPES = ["phones", "laptops", "tablets"];
const TYPE_MAP = { phones: "phone", laptops: "laptop", tablets: "tablet" };

PRODUCT_TYPES.forEach((type) => {
  router.get(`/${type}`, async (req, res) => {
    try {
      const products = await productModel.find({
        isPublished: true,
        productType: TYPE_MAP[type],
      });
      res.json(products);
    } catch (error) {
      handleError(res, error, `Error fetching ${type}`);
    }
  });
});

// ─── Single Product by Name ──────────────────────────────

["phone", "laptop", "tablet"].forEach((type) => {
  router.get(`/${type}/:name`, async (req, res) => {
    try {
      const products = await productModel.find({
        isPublished: true,
        productType: type,
      });

      const product = products.find(
        (p) =>
          p.name.toLowerCase().split(" ").join("") ===
          req.params.name.toLowerCase()
      );

      if (!product)
        return res.status(404).json({ message: `${type} not found` });

      res.json(product);
    } catch (error) {
      handleError(res, error, `Error fetching ${type}`);
    }
  });
});

// ─── Boolean Flag Routes ──────────────────────────────────

const FLAG_ROUTES = {
  latest: { latest: true },
  mostpopular: { mostpopular: true },
  mostsold: { mostsold: true },
  recommended: { recommended: true },
};

Object.entries(FLAG_ROUTES).forEach(([route, query]) => {
  router.get(`/${route}`, async (req, res) => {
    try {
      const data = await productModel.find({
        isPublished: true,
        ...query,
      });
      res.json(data.map(formatProduct));
    } catch (error) {
      handleError(res, error, `Error fetching ${route}`);
    }
  });
});

// ─── Category Routes ──────────────────────────────────────

const CATEGORY_ROUTES = ["budget", "midrange", "flagship"];

CATEGORY_ROUTES.forEach((category) => {
  router.get(`/${category}`, async (req, res) => {
    try {
      const data = await productModel.find({
        isPublished: true,
        item_categorie: category,
      });
      res.json(data.map(formatProduct));
    } catch (error) {
      handleError(res, error, `Error fetching ${category}`);
    }
  });
});

// ─── Target Audience Routes ───────────────────────────────

const AUDIENCE_ROUTES = ["gaming", "professional", "students", "normalusage"];

AUDIENCE_ROUTES.forEach((audience) => {
  router.get(`/${audience}-devices`, async (req, res) => {
    try {
      const data = await productModel.find({
        isPublished: true,
        targetaudience: audience,
      });
      res.json(data.map(formatProduct));
    } catch (error) {
      handleError(res, error, `Error fetching ${audience} devices`);
    }
  });
});

// ─── Popularity ───────────────────────────────────────────

router.get("/popularity", async (req, res) => {
  try {
    const data = await productModel.find({
      isPublished: true,
      popularity: "popular",
    });
    res.json(data.map(formatProduct));
  } catch (error) {
    handleError(res, error, "Error fetching popularity");
  }
});

module.exports = router;