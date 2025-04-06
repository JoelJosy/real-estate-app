const pool = require("../config/db");

const createFavoritesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      property_id INT REFERENCES properties(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, property_id)
    );
  `;
  await pool.query(query);
};

module.exports = { createFavoritesTable };