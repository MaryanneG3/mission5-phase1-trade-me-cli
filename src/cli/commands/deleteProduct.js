const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");
const listProducts = require("./listProducts");

const requestID = async () => {
  const inquirer = require("inquirer");

  const requestID = await inquirer.prompt({
    name: "_id",
    message:
      "Enter the 24 digit Product ID of the product you wish to delete: ",
  });
};

const deleteProduct = async () => {
  try {
    await connectProductsDB();
    await listProducts();
    await requestID();

    const products = await Products.find();
    const availableIds = products.map((product) => product._id);

    validateID(requestID._id, availableIds);

    //  else {
    //       const productFound = await Products.findById(requestedId._id);

    //       const answer = await inquirer.prompt({
    //         name: "deleteProduct",
    //         message: "Are you sure you want to delete this product? Yes ? No",
    //       });
    //       if (answer.deleteProduct === "Yes") {
    //         console.log("Deleting product...");

    //         const deletedProduct = await Products.findByIdAndDelete(
    //           requestedId._id
    //         );
    //       }
    //     }

    if (deleteProduct) {
      console.log("Product deleted successfully: ", deletedProduct);
    } else {
      console.log("Product not found");
    }
  } catch (error) {
    console.error("Error deleting product: ", error);
  } finally {
    process.exit(); // Exit the process after operation is complete
  }
};

const validateID = (id, availableIds) => {
  const invalidIDMessage = "ID is invalid. Please enter a valid 24 digit ID";

  if (id.length !== 24) {
    console.log(invalidIDMessage);
  } else if (typeof id === "string") {
    console.log(invalidIDMessage);
  } else if (!availableIds.includes(id)) {
    console.log("Product not found");
  }
};

module.exports = deleteProduct;
