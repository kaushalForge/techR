const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/phone/:name", async (req, res) => {
  const { name } = req.params;
  let id;

  try {
    const products = await productModel.find();
    products.forEach((item) => {
      const dbName = item.name.toLowerCase().split(" ").join("");
      if (dbName === name) {
        id = item.id;
      }
      return;
    });
    const sendData = await productModel.findOne({
      _id: id,
      productType: "phone",
    });
    res.json(sendData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/laptop/:name", async (req, res) => {
  const { name } = req.params;
  let id;

  try {
    const products = await productModel.find();
    products.forEach((item) => {
      const dbName = item.name.toLowerCase().split(" ").join("");
      if (dbName === name) {
        id = item.id;
      }
      return;
    });
    const sendData = await productModel.findOne({
      _id: id,
      productType: "laptop",
    });
    res.json(sendData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/tablet/:name", async (req, res) => {
  const { name } = req.params;
  let id;

  try {
    const products = await productModel.find();
    products.forEach((item) => {
      const dbName = item.name.toLowerCase().split(" ").join("");
      if (dbName === name) {
        id = item.id;
      }
      return;
    });
    const sendData = await productModel.findOne({
      _id: id,
      productType: "tablet",
    });
    res.json(sendData);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
