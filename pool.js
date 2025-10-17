const { Pool } = require('pg');

// Create a single shared connection pool for the whole app
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require')
    ? undefined
    : { rejectUnauthorized: false }
});

module.exports = { pool };


