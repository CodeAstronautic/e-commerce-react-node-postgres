const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration function
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: "user",
    });
    res
      .status(201)
      .json({ id: user.id, username: user.username, role: user.role });
  } catch (error) {
    console.log("Error during registration:", error);
    res.status(400).json({ error: "User registration failed." });
  }
};

// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if user exists and verify password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );
      return res.json({
        role: user?.dataValues?.role,
        token,
        userID: user?.dataValues?.id,
        username: user?.dataValues?.username,
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

exports.updateUser = async (req, res) => {
  const { username, password } = req.body;
  const userId = req.user.id; 
  try {
    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log("username, password",username, password)

    // Update the username if provided
    if (username) {
      user.username = username;
    }

    // Update the password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10); // Hash the new password
    }


    console.log("user----------------",user)
    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};
