/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           description: ID del producto
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         value:
 *           type: number
 *           description: Valor del producto
 *         category:
 *           type: string
 *           description: ID de la categoría asociada
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la categoría
 *         name:
 *           type: string
 *           description: Nombre de la categoría
 *         description:
 *           type: string
 *           description: Descripción de la categoría
 *         products:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de productos asociados
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error al crear el producto
 *
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 *
 * /categories:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *         description: Error al crear la categoría
 *
 * /categories/{categoryId}/product/{productId}:
 *   post:
 *     summary: Añade un producto a una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto añadido a la categoría
 *       404:
 *         description: Producto o categoría no encontrados
 *
 * /categories/{id}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *             required:
 *               - name
 *               - description
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Parámetros faltantes o inválidos
 *       404:
 *         description: Categoría no encontrada
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */

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
  addProductToCategory,
  updateCategory, 
  deleteCategory,
} = require('./../controllers/controll-categories');

// Rutas para productos
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Rutas para categorías
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory); 
router.delete('/categories/:id', deleteCategory);
router.post('/categories/:categoryId/product/:productId', addProductToCategory);

module.exports = router;
