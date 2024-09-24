const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
});

// Function to test the database connection
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    throw new Error('Database connection failed: ' + error.message);
  }
};

// Exporting the sequelize instance and the connect function
module.exports = {
  sequelize,
  connect,
};
