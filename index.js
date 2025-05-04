const express = require('express');
const app = express();
const db = require('./db');
const rutas = require('./routes');
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use(rutas);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Crear tabla si no existe
async function crearTablaSiNoExiste() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS portafolio_db (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion VARCHAR(150),
        fecha TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tabla portafolio_db verificada o creada correctamente.');
  } catch (error) {
    console.error('Error al crear/verificar la tabla:', error);
    process.exit(1); // Cierra el servidor si falla
  }
}

// Iniciar el servidor después de crear/verificar la tabla
crearTablaSiNoExiste().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
