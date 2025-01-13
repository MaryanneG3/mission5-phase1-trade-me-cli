const Products = require("../models/productsModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  requestID,
  checkProducts,
  validateID,
} = require("../../cli/helpers/productFunctions");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.addProduct = async (req, res) => {
  try {
    const product = new Products(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: "Failed to add product", details: error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const products = await Products.find();
    await checkProducts(products);

    const availableIds = products.map((product) => product._id.toString());

    let isValidID = false;
    let requestedID;

    while (!isValidID) {
      requestedID = req.body.id || req.query.id;
      if (!requestedID) {
        return res.status(400).send({ error: "ID is required" });
      }

      isValidID = await validateID(requestedID, availableIds);
      if (!isValidID) {
        return res
          .status(400)
          .send({ error: "Invalid ID. Please enter a valid product ID." });
      }
    }

    const product = await Products.findByIdAndDelete(requestedID);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete product", details: error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products", details: error });
  }
};

exports.searchProduct = async (req, res) => {
  const { keyword } = req.body;

  try {
    const products = await Products.find();

    const keywordMatchResults = await Promise.all(
      products.map(async (product) => {
        try {
          const prompt = `Does the following product description match the keyword: "${keyword}"?

                          Product Description: ${product.description}

                          Example:
                          - If the keyword is "furniture" and the description is "a black couch," respond with "Yes" because a couch is related to furniture.
                          - If the keyword is "furniture" and the description is "a student desk," respond with "Yes" because a desk is also a type of furniture.
                          - If the keyword is "furniture" and the description is "a smartphone," respond with "No" because a smartphone is not related to furniture.

                          Respond with "Yes" if the description matches the keyword, or "No" if it does not.`;
          const response = await model.generateContent(prompt);

          console.log(response);
          return { product, match: response.includes("Yes") };
        } catch (error) {
          console.error("Error generating content: ", error);
          return { product, match: false };
        }
      })
    );

    const matchingProducts = keywordMatchResults
      .filter((result) => result.match)
      .map((result) => result.product);

    if (matchingProducts.length > 0) {
      res.status(200).send(matchingProducts);
    } else {
      res.status(404).send({ message: "No matching products found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products", details: error });
  }
};
