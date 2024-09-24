const Product = require('../models/Product');
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Product.update(req.body, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.json(updatedProduct);
    }
    return res.status(404).json({ error: 'Product not found.' });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ error: 'Product update failed.' });
  }
};
