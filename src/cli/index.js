const connectProductsDB = require("../server/db/productsDBConfig");
const addProduct = require("./commands/addProduct");
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

program.parse(process.argv);
