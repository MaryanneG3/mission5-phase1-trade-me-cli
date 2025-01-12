const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");
const listProducts = require("./listProducts");
const inquirer = require("inquirer");

let requestedID;

const requestID = async () => {
  requestedID = await inquirer.prompt({
    name: "_id",
    message:
      "Enter the 24 digit Product ID of the product you wish to delete: ",
  });

  return requestedID;
};

const deleteProduct = async () => {
  try {
    await connectProductsDB();
    await listProducts();

    let isValidID = false;
    const products = await Products.find();
    const availableIds = products.map((product) => product._id);

    while (!isValidID) {
      await requestID();
      isValidID = validateID(requestedID._id, availableIds);
    }

    const deletedProduct = await Products.findByIdAndDelete(requestedID._id);

    if (deletedProduct) {
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

  if (id.length !== 24 || typeof id !== "string") {
    console.log(invalidIDMessage);
    return false;
  } else if (!availableIds.includes(id)) {
    console.log("No match found for the entered ID");
    return true;
  }
  return true;
};

module.exports = deleteProduct;
