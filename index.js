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

// Crear tablas si no existen
async function crearTablasSiNoExisten() {
  try {
    // Crear tabla portafolio_db
    await db.query(`
      CREATE TABLE IF NOT EXISTS portafolio_db (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion VARCHAR(150),
        fecha TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tabla portafolio_db verificada o creada correctamente.');

    // Crear tabla trabajos
    await db.query(`
      CREATE TABLE IF NOT EXISTS trabajos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        portafolio_id UUID REFERENCES portafolio_db(id),
        nombre TEXT,
        url_archivo TEXT,
        tipo TEXT,
        fecha_subida TIMESTAMP DEFAULT NOW(),
        orden INT DEFAULT 0
      );
    `);
    console.log('Tabla trabajos verificada o creada correctamente.');

    // Habilitar extensión pgcrypto si no está habilitada
    await db.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);
    console.log('Extensión pgcrypto habilitada correctamente.');
    
  } catch (error) {
    console.error('Error al crear/verificar las tablas o habilitar la extensión:', error);
    process.exit(1); // Cierra el servidor si falla
  }
}

// Iniciar el servidor después de crear/verificar las tablas
crearTablasSiNoExisten().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
