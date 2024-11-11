const express = require("express");
const router = express();
const productModel = require("../models/Products");

router.post("/", async (req, res) => {
  let { deviceType, processor, ram, graphic, battery, price } = req.body;

  if (!processor && !ram && !graphic && !battery && !price) {
    return res.json("At least one piece of information is needed to filter!");
  }
  let query = {
    
  };

  // if (processor) {
  //   // Check if processor is an array, and flatten it if so; otherwise, split it by whitespace
  //   const processorArray = Array.isArray(processor)
  //     ? processor.flat()
  //     : processor.split(/\s+/);

  //   console.log(processorArray, "flattened data"); // Debug output

  //   const processorKeywords = processorArray.map(
  //     (keyword) => new RegExp(keyword, "i")
  //   );

  //   query.processor = {
  //     $all: processorKeywords,
  //   };
  // }

  // for (let i = 0; i < processor.length; i++) {
  //   for (let j = 0; j < processor.length; j++) {
  //     console.log(processor[i][j]);
  //   }
  // }

  // if (graphic) {
  //   const graphicKeywords = Array.isArray(graphic)
  //     ? graphic.flat()
  //     : graphic.split(/\s+/);

  //   query.graphic = {
  //     $all: graphicKeywords.map((keyword) => new RegExp(keyword, "i")),
  //   };
  // }

  // if (ram) {
  //   const ramKeywords = Array.isArray(ram) ? ram.flat() : ram.split(/\s+/);

  //   query.ram = {
  //     $all: ramKeywords.map((keyword) => new RegExp(keyword, "i")),
  //   };
  // }

  if (battery) {
    query.battery = battery;
  }

  // if (price) {
  //   const priceKeywords = Array.isArray(price)
  //     ? price.flat()
  //     : price.split(/\s+/);

  //   query.price = {
  //     $all: priceKeywords.map((keyword) => new RegExp(keyword, "i")),
  //   };
  // }
  // console.log(query.processor);

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
