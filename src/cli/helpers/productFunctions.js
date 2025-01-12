const inquirer = require("inquirer");
const listProducts = require("../commands/listProducts"); // Adjust the path accordingly

const requestID = async () => {
  const requestedID = await inquirer.prompt({
    name: "_id",
    message: "\nEnter the 24 digit Product ID:",
  });

  return requestedID;
};

const checkProducts = async (products) => {
  if (products.length === 0) {
    console.log(`\n----------------------------------------------------------`);
    console.log("No products found");
    console.log(`----------------------------------------------------------`);
    process.exit();
  }
};

const validateID = async (id, availableIds) => {
  const invalidIDMessage = "ID is invalid. Please enter a valid 24 digit ID";

  if (id.length !== 24 || typeof id !== "string") {
    console.log(invalidIDMessage);
    return false;
  } else if (!availableIds.includes(id)) {
    console.log(
      "No match found for the entered ID.\n\nCheck list of products below:\n"
    );
    await listProducts(false);
    return false;
  } else {
    console.log("Match found");
    return true;
  }
};

module.exports = { requestID, checkProducts, validateID };
