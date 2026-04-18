const express = require("express");
const router = express.Router();
const { SitemapStream, streamToPromise } = require("sitemap");
const productModel = require("../Backend/models/Products");

const domainURL = process.env.domainURL;

const findNames = async () => {
  try {
    const phone = [];
    const laptop = [];
    const tablet = [];

    const products = await productModel.find({ isPublished: true });

    products.forEach((product) => {
      const slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (product.productType === "phone") phone.push(slug);
      if (product.productType === "laptop") laptop.push(slug);
      if (product.productType === "tablet") tablet.push(slug);
    });

    return { phone, laptop, tablet };
  } catch (error) {
    console.error(error);
    return { phone: [], laptop: [], tablet: [] };
  }
};

router.get("/", async (req, res) => {
  try {
    const { phone, laptop, tablet } = await findNames();

    const sitemap = new SitemapStream({
      hostname: domainURL,
    });

    const now = new Date().toISOString();

    // Static pages
    sitemap.write({ url: "/", lastmod: now });
    sitemap.write({ url: "/phones", lastmod: now });
    sitemap.write({ url: "/laptops", lastmod: now });
    sitemap.write({ url: "/tablets", lastmod: now });
    sitemap.write({ url: "/about", lastmod: now });

    // Dynamic pages
    phone.forEach((slug) => {
      sitemap.write({
        url: `/phone/${slug}`,
        lastmod: now,
      });
    });

    laptop.forEach((slug) => {
      sitemap.write({
        url: `/laptop/${slug}`,
        lastmod: now,
      });
    });

    tablet.forEach((slug) => {
      sitemap.write({
        url: `/tablet/${slug}`,
        lastmod: now,
      });
    });

    sitemap.end();

    const xml = await streamToPromise(sitemap).then((data) => data.toString());

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;
