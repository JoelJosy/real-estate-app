const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, name, income, password, user_type } = req.body;
  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email, username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, name, income, password_hash, user_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, email, name, income, password_hash, user_type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.rows[0].id, user_type: user.rows[0].user_type }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true }).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;