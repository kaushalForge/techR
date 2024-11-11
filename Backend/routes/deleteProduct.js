const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/product", (req, res) => {
  res.render("Delete");
});

router.post("/product", async (req, res) => {
  const { productType, productName, productId } = req.body;

  try {
    const formattedName = productName.toLowerCase().split(" ").join("");

    const query = { _id: productId, name: formattedName, productType };

    const result = await productModel.deleteOne(query);

    if (result.deletedCount > 0) {
      return res.redirect("/");
    } else {
      return res.status(404).send("Item not found.");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).send("Error deleting item");
  }
});

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
router.post("/product/field", async (req, res) => {
  const { productType, productId, productField } = req.body;
  console.log(productType, productId, productField);

  try {
    const query = { _id: new ObjectId(productId), productType };
    console.log("Query to MongoDB:", query); // Log the query

    const update = { $unset: { [productField]: "" } };
    console.log("Update operation:", update); // Log the update operation

    const result = await productModel.updateOne(query, update);

    console.log("Update result:", result); // Log the result of the update

    if (result.modifiedCount > 0) {
      res.redirect("/");
    } else {
      return res.status(404).send("Field not found or no documents matched.");
    }
  } catch (error) {
    console.error("Error deleting field:", error);
    res.status(500).send("Error deleting field");
  }
});

module.exports = router;
