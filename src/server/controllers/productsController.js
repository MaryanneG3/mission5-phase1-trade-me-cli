const Products = require("../models/productsModel");
const {
  requestID,
  checkProducts,
  validateID,
} = require("../../cli/helpers/productFunctions");

exports.addProduct = async (req, res) => {
  try {
    const product = new Products(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res
      .status(400)
      .send({ error: "Failed to add product", details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products.length) {
      return res.status(404).send({ error: "No products available to delete" });
    }

    const availableIds = products.map((product) => product._id.toString());

    const requestedID = req.body.id || req.query.id;
    if (!requestedID) {
      return res.status(400).send({ error: "ID is required" });
    }

    const isValidID = await validateID(requestedID, availableIds);
    if (!isValidID) {
      return res
        .status(400)
        .send({ error: "Invalid ID. Please enter a valid product ID." });
    }

    const product = await Products.findByIdAndDelete(requestedID);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully", product });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to delete product", details: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products.length) {
      return res.status(404).send({ message: "No products found" });
    }
    res.status(200).send(products);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch products", details: error.message });
  }
};

exports.searchProduct = async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).send({ error: "Keyword is required" });
  }

  try {
    const products = await Products.find();

    if (!products.length) {
      return res.status(404).send({ message: "No products available" });
    }

    const matchingProducts = products.filter((product) => {
      if (!product.description) return false;
      return product.description.toLowerCase().includes(keyword.toLowerCase());
    });

    if (matchingProducts.length > 0) {
      res.status(200).send(matchingProducts);
    } else {
      res.status(404).send({ message: "No matching products found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to search products", details: error.message });
  }
};
