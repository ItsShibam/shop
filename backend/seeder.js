const mongoose = require("mongoose");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");
const colors = require("colors");

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    process.exit();
  } catch (error) {
    process.exit(1);
  }
};


if(process.argv[2] == '-d') {
    destroyData();
} else {
    importData();
}