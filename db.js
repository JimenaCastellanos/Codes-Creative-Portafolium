const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log('🔗 Conectando a base de datos:', process.env.DATABASE_URL);

module.exports = pool;

