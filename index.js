const express = require('express');
const app = express();
const path = require('path');
const rutas = require('./routes');

require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(rutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
