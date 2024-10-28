const mongoose = require("mongoose");
const URI = process.env.URI;
const databaseConnection = async () => {
  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log("MongoDB Connection successful for product-model");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
databaseConnection();

const productSchema = new mongoose.Schema({
  descriptions: [
    {
      heading: { type: String },
      detail: { type: String },
      descriptionimage: { type: String },
    },
  ],
  targetaudience: {
    type: [],
  },
  latest: {
    type: String,
  },
  mostsold: {
    type: String,
  },
  mostpopular: {
    type: String,
  },
  recommended: {
    type: String,
  },
  item_categorie: {
    type: String,
  },
  productType: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  dtype: {
    type: String,
  },
  size: {
    type: [],
  },
  resolution: {
    type: String,
  },
  ram: {
    type: [[String]],
    default: [],
  },
  storage: {
    type: [[String]],
    default: [],
  },
  price: {
    type: [[String]],
    default: [],
  },
  os: {
    type: [],
  },
  processor: {
    type: [[String]],
    default: [],
  },
  graphic: {
    type: [[String]],
    default: [],
  },
  capacity: {
    type: [],
  },
  charging: {
    type: [],
  },
  dimension: {
    type: String,
  },
  build: {
    type: String,
  },
  weight: {
    type: String,
  },
  wifi: {
    type: String,
  },
  bluetooth: {
    type: String,
  },
  typec: {
    type: String,
  },
  usba: {
    type: String,
  },
  ethernet: {
    type: String,
  },
  hdmi: {
    type: String,
  },
  audiojack: {
    type: String,
  },
  maincamera: {
    type: String,
  },
  frontcamera: {
    type: String,
  },
  video: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  popularity: {
    type: String,
  },
  blog: {
    type: String,
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
