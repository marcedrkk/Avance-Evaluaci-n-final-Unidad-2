const express = require('express');
const cors = require('cors');
const app = express();

// Rutas
const loginRoutes = require('./routes/loginRoutes');
const productoRoutes = require('./routes/productoRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', loginRoutes);
app.use('/api', productoRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
