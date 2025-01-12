const Products = require("../models/productsModel");

const addProduct = async (req, res) => {
  const { title, description, start_price, reserve_price } = req.body;

  try {
    const newProduct = new Products({
      title,
      description,
      start_price,
      reserve_price,
    });

    await newProduct.save();
    res.status(201).json(`Success: ${newProduct} added to the database`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct };
