const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");
const inquirer = require("inquirer");
const {
  validateID,
  requestID,
  checkProducts,
} = require("../helpers/productFunctions");

const findProduct = async () => {
  try {
    await connectProductsDB();
    const products = await Products.find();

    await checkProducts(products);

    const method = await inquirer.prompt({
      name: "method",
      message: "Search by ID, Title or Keyword?",
      type: "list",
      choices: ["ID", "Title", "Keyword"],
    });

    if (method.method === "ID") {
      const availableIds = products.map((product) => product._id.toString());

      let isValidID = false;
      let requestedID;

      while (!isValidID) {
        requestedID = await requestID();
        isValidID = await validateID(requestedID._id, availableIds);

        if (!isValidID) {
          console.log("Invalid ID. Please try again.");
        }
      }

      const product = await Products.findById(requestedID._id);

      if (product) {
        console.log("Product found:\n", product);
      } else {
        console.log("No product found with the given ID.");
      }
    } else if (method.method === "Title") {
      const requestedTitle = await inquirer.prompt({
        name: "title",
        message: "\nEnter the title of the product you wish to find: ",
      });

      const titleRegex = new RegExp(`^${requestedTitle.title}`, "i");

      const products = await Products.find({ title: titleRegex });
      checkProducts(products);

      console.log(products);
    } else if (method.method === "Keyword") {
      const requestedKeyword = await inquirer.prompt({
        name: "keyword",
        message: "\nEnter the keyword of the product you wish to find: ",
      });

      const keywordRegex = new RegExp(`^${requestedKeyword.keyword}`, "i");

      const products = await Products.find({
        $or: [{ title: keywordRegex }, { description: keywordRegex }],
      });
      checkProducts(products);
      console.log(products);
    }
  } catch (error) {
    console.error("Error finding product: ", error);
  } finally {
    process.exit(1);
  }
};

module.exports = findProduct;
