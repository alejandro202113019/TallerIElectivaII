// routes/index.js
const express = require('express');
const router = express.Router();

const { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('./../controllers/controll-products');

const { 
  getCategories, 
  createCategory, 
  addProductToCategory 
} = require('./../controllers/controll-categories');

// Rutas para productos
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Rutas para categorías
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.post('/categories/:categoryId/product/:productId', addProductToCategory);

module.exports = router;
