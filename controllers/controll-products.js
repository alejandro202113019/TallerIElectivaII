const Product = require('./../models/product');

module.exports = {
  // Obtener todos los productos
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
  
    // Validar que el ID del producto exista
    if (!id) {
      return res.status(400).json({ error: 'ID del producto no proporcionado' });
    }
  
    try {
      // Buscar el producto por ID
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Enviar el producto encontrado como respuesta
      res.json(product);
    } catch (error) {
      // Manejar errores
      res.status(400).json({ error: error.message });
    }
  },
  


  // Crear un nuevo producto
  createProduct: async (req, res) => {
    try {
      const { name, description, value } = req.body;

      // Validar que los parámetros necesarios existan
      if (!name || !description || !value) {
        return res.status(400).json({ error: 'Faltan parámetros obligatorios: name, description, value' });
      }

      const product = new Product({ name, description, value });
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  
  // Modificar un producto existente
  updateProduct: async (req, res) => {
    const { id } = req.params;

    // Validar que el ID del producto exista
    if (!id) {
      return res.status(400).json({ error: 'ID del producto no proporcionado' });
    }

    try {
      const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });

      if (!productUpdate) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(productUpdate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  deleteProduct: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      console.log(err)
      return res.status(400).json({ error: 'ID del producto no proporcionado' });
    }

    try {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
