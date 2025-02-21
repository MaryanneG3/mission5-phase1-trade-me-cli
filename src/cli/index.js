const connectProductsDB = require("../server/db/productsDBConfig");
const addProduct = require("./commands/addProduct");
const listProducts = require("./commands/listProducts");
const deleteProduct = require("./commands/deleteProduct");
const findProduct = require("./commands/findProduct");
const { Command } = require("commander");
const program = new Command();

async () => {
  await connectProductsDB();
};

// cli commands deifinitions
program
  .command("add")
  .alias("a")
  .description("Add a new product")
  .action(() => {
    addProduct();
  });

program
  .command("list")
  .alias("l")
  .description("List all products")
  .action(() => {
    listProducts();
  });

program
  .command("delete")
  .alias("d")
  .description("Delete a product")
  .action(() => {
    deleteProduct();
  });

program
  .command("find")
  .alias("f")
  .description("Find a product")
  .action(() => {
    findProduct();
  });

program.parse(process.argv);
