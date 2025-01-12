const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.post("/products", productsController.addProduct);

router.delete("/products/:id", productsController.deleteProduct);

router.get("/products", productsController.getAllProducts);

router.post("/products/search", productsController.searchProduct);

module.exports = router;
