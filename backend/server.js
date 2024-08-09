require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const productsRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

connectDB();
const app = express();
app.use(express.json());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Make uplaods folder static
// const __dirname = path.resolve(); // Set __dirname to current directory
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
