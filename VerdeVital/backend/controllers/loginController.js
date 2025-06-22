const db = require('../db/database');

const login = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Correo y contraseña requeridos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
  db.get(sql, [correo, contraseña], (err, usuario) => {
    if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Devolver solo los datos importantes
    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  });
};

module.exports = { login };
