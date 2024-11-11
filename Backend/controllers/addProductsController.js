const productModel = require("../models/Products");
const cloudinary = require("cloudinary");

module.exports.addProducts = async (req, res) => {
  let {
    productType,
    popularity,
    name,
    dimension,
    build,
    weight,
    dtype,
    size,
    resolution,
    os,
    processor,
    graphics,
    ram,
    storage,
    capacity,
    charging,
    wifi,
    bluetooth,
    typec,
    usba,
    ethernet,
    hdmi,
    audiojack,
    maincamera,
    frontcamera,
    video,
    price,
    blog,
  } = req.body;

  if (!req.file) return res.json("No image uploaded");
  const imageBuffer = req.file.buffer;
  const image = imageBuffer.toString("base64");
  const result = await cloudinary.uploader.upload(
    `data:image/jpeg;base64,${image}`,
    {
      folder: "products",
    }
  );
  imageURL = result.secure_url;

  if (!name || !image) {
    return res.json({ message: "Name and image are required!" });
  }
  const isExist = await productModel.findOne({ name });
  if (isExist)
    return res.json({ message: "Either name or image already exists" });
  else {
    try {
      const addItems = await productModel.create({
        productType,
        popularity,
        name,
        dimension,
        build,
        weight,
        dtype,
        size,
        resolution,
        os,
        processor,
        graphics,
        ram,
        storage,
        capacity,
        charging,
        wifi,
        bluetooth,
        typec,
        usba,
        ethernet,
        hdmi,
        audiojack,
        maincamera,
        frontcamera,
        video,
        price,
        image: imageURL,
        blog,
      });
    } catch (error) {
      res.json({ message: "something went wrong", error });
    }
  }
  res.redirect("/products/addProduct");
};
