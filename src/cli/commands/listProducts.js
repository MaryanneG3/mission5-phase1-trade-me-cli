const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");

const listProducts = async () => {
  try {
    await connectProductsDB();
    const products = await Products.find();
    console.log("Products: ");

    products.forEach((product, index) => {
      console.log(
        `${index + 1}. \t${product.title} \n\t Description: ${
          product.description
        } \n\t Start Price: ${product.start_price} \n\t Reserve Price: ${
          product.reserve_price
        }`
      );
    });
  } catch (error) {
    console.error("Error retrieving products: ", error);
  } finally {
    process.exit(); // Exit the process after operation is complete
  }
};

module.exports = listProducts;
