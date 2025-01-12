const Products = require("../../server/models/productsModel");
const connectProductsDB = require("../../server/db/productsDBConfig");

const listProducts = async (exit = true) => {
  try {
    await connectProductsDB();
    const products = await Products.find();

    if (products.length === 0) {
      console.log(
        `\n----------------------------------------------------------`
      );
      console.log("No products found");
      console.log(`----------------------------------------------------------`);

      exit ? process.exit(1) : null;
    } else {
      products.forEach((product, index) => {
        console.log(
          `\n----------------------------------------------------------`
        );
        console.log(`Product ${index + 1}: ID - ${product._id}`);
        console.log(
          `----------------------------------------------------------`
        );
        console.log(
          `Title:\t\t${product.title}\nDescription:\t${product.description}\nStart Price:\t${product.start_price}\nReserve Price:\t${product.reserve_price}\n\n`
        );
      });
      exit ? process.exit(1) : null;
    }
  } catch (error) {
    console.error("Error retrieving products: ", error);
    exit ? process.exit(1) : null;
  }
};

module.exports = listProducts;
