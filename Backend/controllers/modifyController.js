const productModel = require("../models/Products");
const cloudinary = require("cloudinary");

module.exports.modifyProducts = async (req, res) => {
  try {
    const id = req.params.id;

    let {
      latest,
      mostsold,
      mostpopular,
      targetaudience,
      recommended,
      item_categorie,
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
      previousimage,
    } = req.body;
    let imageURL = previousimage;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const image = imageBuffer.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${image}`,
        {
          folder: "products",
        }
      );
      imageURL = result.secure_url;
    }
    const { heading, detail, descriptionimage } = req.body;

    const descriptions = heading.map((item, index) => ({
      heading: heading[index],
      detail: detail[index],
      descriptionimage: descriptionimage[index],
    }));


    const updatedData = {
      latest: latest === "true" ? "true" : "false",
      mostsold: mostsold === "true" ? "true" : "false",
      mostpopular: mostpopular === "true" ? "true" : "false",
      recommended: recommended === "true" ? "true" : "false",
    };

    await productModel.findOneAndUpdate(
      { _id: id },
      {
        latest: updatedData.latest,
        mostsold: updatedData.mostsold,
        mostpopular: updatedData.mostpopular,
        recommended: updatedData.recommended,
        descriptions,
        item_categorie,
        productType,
        targetaudience,
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
      }
    );

    if (productType === "phone") {
      res.redirect("/phones");
    } else if (productType === "laptop") {
      res.redirect("/laptops");
    } else if (productType === "tablet") {
      res.redirect("/tablets");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error updating the product:", error);
    res.redirect("/");
  }
};
