const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const rutasPortafolio = require("./routes");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(rutasPortafolio);

// Base de datos
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
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
    console.error("Error al crear/verificar la tabla:", error);
  }
}

crearTablasSiNoExisten();

app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente 🎉");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
