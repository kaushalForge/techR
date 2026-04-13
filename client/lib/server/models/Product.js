import mongoose from "mongoose";

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
  images: {
    type: [String],
    default: [],
  },
  popularity: {
    type: String,
  },
  blog: {
    type: String,
  },
});

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
