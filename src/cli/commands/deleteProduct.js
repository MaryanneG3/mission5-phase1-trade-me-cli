const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");
const listProducts = require("./listProducts");
const {
  checkProducts,
  requestID,
  validateID,
} = require("../helpers/productFunctions");

const deleteProduct = async () => {
  try {
    await connectProductsDB();
    await listProducts(false);

    const products = await Products.find();
    await checkProducts(products);

    const availableIds = products.map((product) => product._id.toString());

    let isValidID = false;
    let requestedID;
    while (!isValidID) {
      requestedID = await requestID();
      isValidID = await validateID(requestedID._id, availableIds);
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
    process.exit();
  }
};

module.exports = deleteProduct;
