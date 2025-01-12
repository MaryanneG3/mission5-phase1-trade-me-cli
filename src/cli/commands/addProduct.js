const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");

const addProduct = async (res) => {
  const inquirer = require("inquirer");
  try {
    const answers = await inquirer.prompt([
      { name: "title", message: "Enter the product title: " },
      { name: "description", message: "Enter the product description: " },
      { name: "start_price", message: "Enter the product start price: " },
      { name: "reserve_price", message: "Enter the product reserve price: " },
    ]);

    await connectProductsDB();

    // Create a new product instance with the answers
    const product = new Products({
      title: answers.title,
      description: answers.description,
      start_price: answers.start_price,
      reserve_price: answers.reserve_price,
    });

    // Save the new product to the database
    await product.save();

    console.log("Product added successfully: ", product);
  } catch (error) {
    console.error("Error adding product: ", error);
  } finally {
    process.exit(); // Exit the process after operation is complete
  }
};

module.exports = addProduct;
