const express = require("express");
const router = express();
const productModel = require("../models/Products");

router.post("/", async (req, res) => {
  let { deviceType, processor, ram, graphics, battery, price } = req.body;

  if (!processor && !ram && !graphics && !battery && !price) {
    return res.json("At least one information is needed to filter!");
  }

  let query = {};

  if (processor) {
    const processorKeywords = processor.split(/\s+/);

    query.processor = {
      $all: processorKeywords.map((keyword) => new RegExp(keyword, "i")),
    };
  }

  if (graphics) {
    const graphicsKeywords = graphics.split(/\s+/);

    query.graphics = {
      $all: graphicsKeywords.map((keyword) => new RegExp(keyword, "i")),
    };
  }
  try {
    const devices = await productModel.find({
      productType: deviceType,
      ...query,
    });
    if (devices.length > 0) {
      return res.json({
        name: devices[0].name.toLowerCase().split(" ").join(""),
        productType: devices[0].productType,
      });
    } else {
      return res.json({ message: "No such device found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
