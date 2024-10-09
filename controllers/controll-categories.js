// controllers/controll-categories.js
const Category = require('./../models/category');
const Product = require('./../models/product');

module.exports = {
  // Obtener todas las categorías con los productos relacionados
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find().populate('products'); // Popular los productos relacionados
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear una nueva categoría y asignarle productos
  createCategory: async (req, res) => {
    try {
      const { name, description, productIds } = req.body; // productIds es un array de IDs de productos
      const category = new Category({ name, description, products: productIds });

      await category.save();
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Agregar un producto a una categoría existente
  addProductToCategory: async (req, res) => {
    const { categoryId, productId } = req.params;

    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      category.products.push(productId);
      await category.save();

      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
