<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is designed to address the TradeMe user's feedback that "product pages are overloaded with information." The goal is to create an efficient, streamlined API that serves only the minimum data required for auction items, using MongoDB as the NoSQL database to store and manage the data. The project consists of two key functionalities:

### Folder Structure:

    src/server: Contains the API implementation and server logic

    src/cli: Houses the CLI tool for database operations, including seeding, updating, and deleting data.

### Command-Line Interface (CLI) Tool

    The CLI tool, located in the cli folder, is used to seed sample auction data into the MongoDB database and manage CRUD (Create, Read, Update, Delete) operations.

    Developers can add pre-defined auction items with the following fields:

        title: The name of the auction item.
        description: A brief description of the item.
        start_price: The starting price for the auction.
        reserve_price: The minimum price at which the item can be sold.

### Server and API Setup

    The server folder contains the API setup, which is designed to:

    1. Provide CRUD operations for auction data through API endpoints.
    2. Enable search functionality to retrieve auction items that match specified criteria.

### User Interaction:

#### Command-Line Interface (CLI) Tool

The CLI tool can be run by the user using the following code:

<p style="color: lightblue"> node src/cli/index.js <span style="color: lightgreen">command</span> </p>

Below are the commands:

    "add" or 'a'

        - when user runs add command they will be prompted to input the new product fields one by one in the terminal
        - respond with each product detail

    "delete" or 'd'

        - user will be prompted to enter an id in terminal
        - respond with id

    "list" or 'l'

        - user will receive a list of products in the database(none if null)

    "find" or 'f'

        - user will be prompted to make a selection

**Generative AI Use**:

- The search function utilizes Google Gemini, which upon receiving the product descriptions from the database will create a response if a product description matches the keyword entered by the user

**Purpose**: This tool aims to help users prepare for job interviews by simulating real-world interview scenarios, offering personalized feedback, and improving their interview skills.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section lists major frameworks/libraries used to bootstrap this project.

[![Node][Node.js]][Node-url]
[![Express][Express.js]][Express-url]
[![Mongoose][Mongoose]][Mongoose-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy of the application up and running follow these simple example steps.

### Prerequisites

**Server**

- express

  ```sh
  npm install express
  ```

- cors

  ```sh
  npm install cors
  ```

- mongoose

  ```sh
  npm install mongoose
  ```

- google generative ai

  ```sh
  npm install   @google/generative-ai
  ```

**CLI**

- commander

  ```sh
  npm install commander
  ```

- inquirer

  ```sh
  npm install inquirer
  ```

- mongoose

  ```sh
  npm install mongoose
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MaryanneG3/mission5-phase1-trade-me-cli.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Get a free API Key at [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
4. Enter your API key in `productsController.js` in the server directory
   ```js
   const genAI = "ENTER YOUR API KEY";
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To use the cli tool simply run <p style="color: lightblue"> node src/cli/index.js <span style="color: lightgreen">command</span> </p>

To start the server run npm run dev

To test api endpoints in postman simply enter the data in json format in the rquest body

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Helpful resources

- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [GitHub](https://github.com)
- [ChatGPT](https://chatgpt.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=blue
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=blue
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=blue
[Express-url]: https://expressjs.com/
[Mongoose]: https://img.shields.io/badge/Mongoose-20232A?style=for-the-badge&logo=Mongoose&logoColor=blue
[Mongoose-url]: https://mongoosejs.com/
