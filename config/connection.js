// Importing the Sequelize library for working with SQL databases
const Sequelize = require('sequelize');

// Importing the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Initializing a variable to hold the Sequelize instance
let sequelize;

// Checking if a JAWSDB_URL environment variable is set (indicating a production environment)
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is set, create a new Sequelize instance using the provided URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not set (indicating a development environment), configure Sequelize with local database settings
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
//add secret for encryption