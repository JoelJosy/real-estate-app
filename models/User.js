const pool = require("../config/db");

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      income NUMERIC,
      user_type VARCHAR(10) CHECK (user_type IN ('buyer', 'seller')) NOT NULL,
      saved_properties INT[] DEFAULT '{}',
      password_hash TEXT NOT NULL
    );
  `;
  await pool.query(query);
};

module.exports = { createUserTable };
