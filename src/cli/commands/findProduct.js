const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");
const inquirer = require("inquirer");

const findProduct = async () => {
  try {
    await connectProductsDB();
    const products = await Products.find();

    if (products.length === 0) {
      console.log(
        `\n----------------------------------------------------------`
      );
      console.log("No products found");
      console.log(`----------------------------------------------------------`);

      process.exit(1);
    } else {
      const method = await inquirer.prompt({
        name: "method",
        message: "Search by ID or Title?",
        type: "list",
        choices: ["ID", "Title"],
      });

      if (method.method === "ID") {
        const requestedID = await inquirer.prompt({
          name: "_id",
          message:
            "\nEnter the 24 digit Product ID of the product you wish to find: ",
        });

        const product = await Products.findById(requestedID._id);
        console.log(product);
      } else if (method.method === "Title") {
        const requestedTitle = await inquirer.prompt({
          name: "title",
          message: "\nEnter the title of the product you wish to find: ",
        });

        const titleRegex = new RegExp(`^${requestedTitle.title}`, "i");

        const products = await Products.find({ title: titleRegex });
        console.log(products.title);
      }
    }
  } catch (error) {
    console.error("Error finding product: ", error);
    process.exit(1);
  }
};

module.exports = findProduct;
