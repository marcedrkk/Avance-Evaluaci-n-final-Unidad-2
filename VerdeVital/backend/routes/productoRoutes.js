const express = require('express');
const router = express.Router();
const {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto
} = require('../controllers/productoController');

// Ruta para obtener todos los productos
router.get('/productos', getProductos);

// Ruta para agregar un nuevo producto
router.post('/productos', postProducto);

// Ruta para actualizar producto por ID
router.put('/productos/:id', putProducto);

// Ruta para eliminar producto por ID
router.delete('/productos/:id', deleteProducto);

module.exports = router;
