const express = require("express");
const router = express.Router();
const { SitemapStream, streamToPromise } = require("sitemap");
const productModel = require("../Backend/models/Products");
const fs = require("fs");
const path = require("path");

const domainURL = process.env.domainURL;

const frontendPublicDir = path.join(__dirname, "../Frontend/public");

const findNames = async () => {
  try {
    const phone = [];
    const laptop = [];
    const tablet = [];
    const products = await productModel.find();

    products.forEach((product) => {
      const formattedName = product.name.toLowerCase().split(" ").join("");

      if (product.productType === "phone") {
        phone.push(formattedName);
      } else if (product.productType === "laptop") {
        laptop.push(formattedName);
      } else if (product.productType === "tablet") {
        tablet.push(formattedName);
      }
    });

    return { phone, laptop, tablet };
  } catch (error) {
    console.error("Error fetching product names:", error);
    return { phone: [], laptop: [], tablet: [] };
  }
};

router.get("/", async (req, res) => {
  try {
    const { phone, laptop, tablet } = await findNames();
    const sitemap = new SitemapStream({
      hostname: domainURL,
      xmlns: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
    });

    sitemap.write({ url: "/" });
    sitemap.write({ url: "/phone" });
    sitemap.write({ url: "/laptop" });
    sitemap.write({ url: "/tablet" });
    sitemap.write({ url: "/about" });
    sitemap.write({ url: "/filter" });

    phone.forEach((item) => {
      sitemap.write({ url: `/phone/${item}` });
    });

    laptop.forEach((item) => {
      sitemap.write({ url: `/laptop/${item}` });
    });

    tablet.forEach((item) => {
      sitemap.write({ url: `/tablet/${item}` });
    });

    sitemap.end();

    const xml = await streamToPromise(sitemap).then((data) => data.toString());

    const formattedXml = xml.replace(/<\/url>/g, "</url>\n");

    const publicDir = path.join(frontendPublicDir, "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    try {
      const filePath = path.join(frontendPublicDir, "sitemap.xml");
      fs.writeFileSync(filePath, formattedXml, "utf8");
    } catch (error) {
      console.error("Error writing file:", error);
    }

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;
