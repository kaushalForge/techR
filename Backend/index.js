require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const sitemapRoute = require("./sitemap-generator");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const frontendURL = process.env.frontendURL;
const corsOptions = {
  origin: frontendURL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(compression());

const homeRouter = require("../Backend/routes/app");
const addProductRouter = require("../Backend/routes/addProduct");
const modifyRouter = require("../Backend/routes/modify");
const phoneRouter = require("../Backend/routes/phones");
const laptopRouter = require("../Backend/routes/laptops");
const tabletRouter = require("../Backend/routes/tablets");
const ownerRouter = require("../Backend/routes/ownerRouter");
const userRouter = require("../Backend/routes/userRouter");
const allproductRouter = require("../Backend/routes/allproductRouter");
const filterRouter = require("../Backend/routes/filterRouter");
const lol = require("./routes/specsFilter");

app.use("/", homeRouter);
app.use("/sitemap", sitemapRoute);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", addProductRouter);
app.use("/modify", modifyRouter);
app.use("/phones", phoneRouter);
app.use("/laptops", laptopRouter);
app.use("/tablets", tabletRouter);
app.use("/allproducts/api", allproductRouter);
app.use("/product/api", filterRouter);
app.use("/filter", lol);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
