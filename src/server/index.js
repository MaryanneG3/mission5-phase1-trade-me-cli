const express = require("express");
const cors = require("cors");
const connectProductsDB = require("./db/productsDBConfig");

const port = 3002;

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectProductsDB();

// api routes
app.get("/", (req, res) => {
  const successMessage = "Successfully connected to the server";
  res.status(200).send(successMessage);
  console.log(successMessage);
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
