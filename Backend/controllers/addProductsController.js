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
    ram1,
    ram2,
    ram3,
    storage1,
    storage2,
    storage3,
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
    price1,
    price2,
    price3,
    blog,
  } = req.body;

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
        ram1,
        ram2,
        ram3,
        storage1,
        storage2,
        storage3,
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
        price1,
        price2,
        price3,
        image: imageURL,
        blog,
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  res.redirect("/products/addProduct");
};
