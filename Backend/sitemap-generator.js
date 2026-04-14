require("dotenv").config();
const express = require("express");
const router = express.Router();
const { SitemapStream, streamToPromise } = require("sitemap");
const productModel = require("../Backend/models/Products");
const fs = require("fs");
const path = require("path");

const domainURL = process.env.domainURL || "https://yourdomain.com";

const frontendPublicDir = path.join(__dirname, "../Frontend/public");

const findNames = async () => {
  try {
    const phone = [];
    const laptop = [];
    const tablet = [];

    // Only fetch published products for sitemap
    const products = await productModel.find({ isPublished: true });

    products.forEach((product) => {
      // Create URL-friendly slug from product name
      const slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace special chars with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

      if (product.productType === "phone") {
        phone.push(slug);
      } else if (product.productType === "laptop") {
        laptop.push(slug);
      } else if (product.productType === "tablet") {
        tablet.push(slug);
      }
    });

    console.log(
      `📊 Sitemap Stats - Phones: ${phone.length}, Laptops: ${laptop.length}, Tablets: ${tablet.length}`,
    );

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

    // Static pages
    sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
    sitemap.write({ url: "/phones", changefreq: "daily", priority: 0.9 });
    sitemap.write({ url: "/laptops", changefreq: "daily", priority: 0.9 });
    sitemap.write({ url: "/tablets", changefreq: "daily", priority: 0.9 });
    sitemap.write({ url: "/about", changefreq: "monthly", priority: 0.5 });
    sitemap.write({ url: "/filter", changefreq: "weekly", priority: 0.7 });

    // Dynamic product pages with format: /productType/product-slug
    phone.forEach((slug) => {
      sitemap.write({
        url: `/phone/${slug}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    laptop.forEach((slug) => {
      sitemap.write({
        url: `/laptop/${slug}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    tablet.forEach((slug) => {
      sitemap.write({
        url: `/tablet/${slug}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    sitemap.end();

    const xml = await streamToPromise(sitemap).then((data) => data.toString());

    // Ensure directory exists
    const publicDir = path.join(frontendPublicDir);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap to file
    const filePath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(filePath, xml, "utf8");
    console.log(`✅ Sitemap generated successfully at ${filePath}`);

    // Send response
    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

// Optional: Route to regenerate sitemap manually
router.post("/regenerate", async (req, res) => {
  try {
    const { phone, laptop, tablet } = await findNames();

    const sitemap = new SitemapStream({ hostname: domainURL });

    sitemap.write({ url: "/" });
    sitemap.write({ url: "/phones" });
    sitemap.write({ url: "/laptops" });
    sitemap.write({ url: "/tablets" });

    phone.forEach((slug) => sitemap.write({ url: `/phone/${slug}` }));
    laptop.forEach((slug) => sitemap.write({ url: `/laptop/${slug}` }));
    tablet.forEach((slug) => sitemap.write({ url: `/tablet/${slug}` }));

    sitemap.end();

    const xml = await streamToPromise(sitemap);
    const filePath = path.join(frontendPublicDir, "sitemap.xml");
    fs.writeFileSync(filePath, xml.toString(), "utf8");

    res.json({ success: true, message: "Sitemap regenerated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
