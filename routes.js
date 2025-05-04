const express = require('express');
const router = express.Router();
const db = require('./db');

// Crear nuevo elemento del portafolio
router.post('/api/portafolios', async (req, res) => {
  const { titulo, descripcion, imagen, categoria } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO portafolio_db (titulo, descripcion, imagen, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, descripcion, imagen, categoria]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear portafolio');
  }
});

// Obtener todos los elementos del portafolio
router.get('/api/portafolios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM portafolio_db ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener portafolios');
  }
});

module.exports = router;
