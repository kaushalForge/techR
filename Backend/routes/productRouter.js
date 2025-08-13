const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

// GET / - Get all products
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    return res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Error fetching products" });
  }
});

// GET /phones - Get all phones
router.get("/phones", async (req, res) => {
  try {
    const phones = await productModel.find({ productType: "phone" });
    return res.json(phones);
  } catch (error) {
    console.error("Error fetching phones:", error);
    return res.status(500).json({ message: "Error fetching phones" });
  }
});

// GET /laptops - Get all laptops
router.get("/laptops", async (req, res) => {
  try {
    const laptops = await productModel.find({ productType: "laptop" });
    return res.json(laptops);
  } catch (error) {
    console.error("Error fetching laptops:", error);
    return res.status(500).json({ message: "Error fetching laptops" });
  }
});

// GET /tablets - Get all tablets
router.get("/tablets", async (req, res) => {
  try {
    const tablets = await productModel.find({ productType: "tablet" });
    return res.json(tablets);
  } catch (error) {
    console.error("Error fetching tablets:", error);
    return res.status(500).json({ message: "Error fetching tablets" });
  }
});

// GET /phone/:id - Get a specific phone by ID
router.get("/phone/:id", async (req, res) => {
  try {
    const phone = await productModel.findById(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }
    return res.json(phone);
  } catch (error) {
    console.error("Error fetching phone:", error);
    return res.status(500).json({ message: "Error fetching phone" });
  }
});

// GET /laptop/:id - Get a specific laptop by ID
router.get("/laptop/:id", async (req, res) => {
  try {
    const laptop = await productModel.findById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ message: "Laptop not found" });
    }
    return res.json(laptop);
  } catch (error) {
    console.error("Error fetching laptop:", error);
    return res.status(500).json({ message: "Error fetching laptop" });
  }
});

// GET /tablet/:id - Get a specific phone by ID
router.get("/tablet/:id", async (req, res) => {
  try {
    const tablet = await productModel.findById(req.params.id);
    if (!tablet) {
      return res.status(404).json({ message: "Tablet not found" });
    }
    return res.json(tablet);
  } catch (error) {
    console.error("Error fetching tablet:", error);
    return res.status(500).json({ message: "Error fetching tablet" });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latest = await productModel.find({ latest: true });
    const formattedData = latest.map((item) => ({
      _id: item._id,
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : null,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/gaming-devices", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "gaming",
    });
    const formattedData = targetaudience.map((item) => ({
      _id: item._id,
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/professional-devices", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "professional",
    });
    const formattedData = targetaudience.map((item) => ({
      _id: item._id,
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/students-devices", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "students",
    });
    const formattedData = targetaudience.map((item) => ({
      _id: item._id,
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/normalusage-devices", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "normalusage",
    });
    const formattedData = targetaudience.map((item) => ({
      _id: item._id,
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/mostpopular", async (req, res) => {
  try {
    const mostpopular = await productModel.find({ mostpopular: true });
    const formattedData = mostpopular.map((item) => ({
      _id: item._id,
      name: item.name,
      image: item.image,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/popularity", async (req, res) => {
  try {
    const popularity = await productModel.find({ popularity: "popular" });
    const formattedData = popularity.map((item) => ({
      _id: item._id,
      name: item.name,
      image: item.image,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/mostsold", async (req, res) => {
  try {
    const mostsold = await productModel.find({ mostsold: true });
    const formattedData = mostsold.map((item) => ({
      id: item._id,
      name: item.name,
      image: item.image,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/budget", async (req, res) => {
  try {
    const budget = await productModel.find({ item_categorie: "budget" });
    const formattedData = budget.map((item) => ({
      _id: item._id,
      name: item.name,
      image: item.image,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/midrange", async (req, res) => {
  try {
    const midrange = await productModel.find({ item_categorie: "midrange" });
    const formattedData = midrange.map((item) => ({
      _id: item._id,
      name: item.name,
      image: item.image,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/flagship", async (req, res) => {
  try {
    const flagship = await productModel.find({ item_categorie: "flagship" });
    const formattedData = flagship.map((item) => ({
      _id: item._id,
      name: item.name,
      image: item.image,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const recommended = await productModel.find({ recommended: true });
    const formattedData = recommended.map((item) => ({
      _id: item._id,
      name: item.name,
      image: item.image,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price:
        item.price && item.price.length > 0 && item.price[0].length > 0
          ? item.price[0][0]
          : "$...",
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

module.exports = router;
