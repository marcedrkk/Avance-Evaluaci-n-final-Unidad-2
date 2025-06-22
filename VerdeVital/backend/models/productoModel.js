const db = require('../db/database');

// Obtener todos los productos
const obtenerProductos = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM productos', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Agregar nuevo producto
const agregarProducto = ({ nombre, precio, stock }) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
    db.run(sql, [nombre, precio, stock], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, nombre, precio, stock });
    });
  });
};

// Actualizar producto
const actualizarProducto = (id, { nombre, precio, stock }) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?';
    db.run(sql, [nombre, precio, stock, id], function (err) {
      if (err) reject(err);
      else resolve({ id, nombre, precio, stock });
    });
  });
};

// Eliminar producto
const eliminarProducto = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM productos WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) reject(err);
      else resolve({ eliminado: true });
    });
  });
};

module.exports = {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
};
