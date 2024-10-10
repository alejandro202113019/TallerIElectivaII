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
      const { name, description, productIds } = req.body;

      // Validar que los parámetros necesarios existan
      if (!name || !description) {
        return res.status(400).json({ error: 'Faltan parámetros obligatorios: name, description' });
      }

      const category = new Category({ name, description, products: productIds || [] });
      await category.save();
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Agregar un producto a una categoría existente

addProductToCategory: async (req, res) => {
  const { categoryId, productId } = req.params;

  // Verificar si los parámetros existen
  if (!categoryId || !productId) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios: categoryId, productId' });
  }

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    // Verificar si el producto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si el producto ya está en la categoría
    if (category.products.includes(productId)) {
      return res.status(400).json({ message: 'El producto ya está asociado a esta categoría' });
    }

    // Agregar el producto a la categoría
    category.products.push(productId);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},

  addProductToCategory: async (req, res) => {
    const { categoryId, productId } = req.params;

    // Verificar si los parámetros existen
    if (!categoryId || !productId) {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios: categoryId, productId' });
    }

    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      // Verificar si el producto existe
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      category.products.push(productId);
      await category.save();
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
},
  // Modificar una categoría existente
  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validar que el ID de la categoría exista
    if (!id) {
      return res.status(400).json({ error: 'ID de la categoría no proporcionado' });
    }

    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      res.json(updatedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar una categoría existente
  deleteCategory: async (req, res) => {
    const { id } = req.params;

    // Validar que el ID de la categoría exista
    if (!id) {
      return res.status(400).json({ error: 'ID de la categoría no proporcionado' });
    }

    try {
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      // Eliminar la referencia a esta categoría en los productos asociados
      await Product.updateMany(
        { categories: id },
        { $pull: { categories: id } }
      );

      res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
