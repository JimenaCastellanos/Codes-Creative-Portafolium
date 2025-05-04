const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/api/portafolios', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO portafolio_db (nombre, descripcion, fecha) VALUES ($1, $2, NOW()) RETURNING *',
      [nombre, descripcion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear portafolio');
  }
});

module.exports = router;