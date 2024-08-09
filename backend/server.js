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
const port = process.env.PORT || 5000;

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Make uplaods folder static
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

  //any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
