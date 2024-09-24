const { sequelize } = require("../config/db");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  try {
    // Sync all models and create tables if they don't exist
    await sequelize.sync({ force: false });

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Create an admin user
    const [adminUser] = await User.findOrCreate({
      where: { username: "admin" },
      defaults: {
        password: hashedPassword, // Use the hashed password
        role: 'admin', // Set role to 'admin'
      },
    });

    console.log("Admin user created or already exists.");
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
};

module.exports = seedAdmin;
