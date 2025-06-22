const db = require('../db/database');

const buscarPorCredenciales = (correo, contraseña, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
  db.get(sql, [correo, contraseña], callback);
};

module.exports = { buscarPorCredenciales };
