const {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} = require('../models/productoModel');

// Obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Agregar un nuevo producto
const postProducto = async (req, res) => {
  try {
    const nuevoProducto = await agregarProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
};

// Actualizar un producto
const putProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await actualizarProducto(id, req.body);
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarProducto(id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto
};
