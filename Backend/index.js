require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const compression = require("compression");
const sitemapRoute = require("./sitemap-generator");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const frontendURL = process.env.frontendURL;
const corsOptions = frontendURL;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const homeRouter = require("../Backend/routes/app");
const addProductRouter = require("../Backend/routes/addProduct");
const modifyRouter = require("../Backend/routes/modify");
const phoneRouter = require("../Backend/routes/phones");
const laptopRouter = require("../Backend/routes/laptops");
const tabletRouter = require("../Backend/routes/tablets");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("../Backend/routes/userRouter");
const productRouter = require("./routes/productRouter");
const searchRouter = require("./routes/searchRouter");
const deleteRouter = require("../Backend/routes/deleteProduct");
const lol = require("./routes/specsFilter");

// Home Route
app.use("/", homeRouter);

// Sitemap Route
app.use("/sitemap", sitemapRoute);

// Admin Route
app.use("/admin", adminRouter);

// Other Routes
app.use("/users", userRouter);
app.use("/products", addProductRouter);
app.use("/delete", deleteRouter);
app.use("/phones", phoneRouter);
app.use("/laptops", laptopRouter);
app.use("/tablets", tabletRouter);
app.use("/modify", modifyRouter);

// API routes
app.use("/api/products", productRouter);
app.use("/api/search", searchRouter);
app.use("/filter", lol);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
