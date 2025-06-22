const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Crear pedido
router.post('/', pedidoController.crear);

// Listar pedidos (admin)
router.get('/', pedidoController.listar);

// Listar pedidos por usuario
router.get('/usuario/:usuario_id', pedidoController.porUsuario);

module.exports = router;
