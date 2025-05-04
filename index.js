const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Para Render
  },
});

// Crear tabla si no existe
async function crearTablasSiNoExisten() {
  try {
    await db.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS portafolio_db (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        titulo TEXT NOT NULL,
        descripcion TEXT,
        imagen TEXT,
        categoria TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tabla portafolio_db verificada o creada correctamente.");
  } catch (error) {
    console.error("Error al crear/verificar las tablas o habilitar la extensión:", error);
  }
}

// Llamar a la función al iniciar el servidor
crearTablasSiNoExisten();

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente 🎉");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
