const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/trade-me-products";

const connectProductsDB = async () => {
  try {
    await mongoose.connect(URI, {});
    console.log("Successfully connected to Trade Me Products Database");
  } catch (error) {
    console.error("Error connecting to the Trade Me Products Database", error);
  }
};

module.exports = connectProductsDB;
