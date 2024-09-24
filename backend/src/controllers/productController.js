const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    // Use the Product model's create method
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      available: stock,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ error: "Product creation failed." });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to retrieve products." });
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
    return res.status(404).json({ error: "Product not found." });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ error: "Product update failed." });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json({ message: "Product delete." });
    }
    return res.status(404).json({ error: "Product not found." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Product deletion failed." });
  }
};
