const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Add to Favorites
router.post("/add", async (req, res) => {
  const { propertyId } = req.body;

  if (!propertyId) {
    return res.status(400).json({ error: "Property ID are required" });
  }

  try {
    // Add the property to the favorites table
    const result = await pool.query(
      "INSERT INTO favorites (property_id) VALUES ($1) RETURNING *",
      [propertyId]
    );

    res.status(200).json(result.rows[0]); // Return the added favorite property
  } catch (err) {
    console.error("Error adding to favorites:", err);
    res.status(500).json({ error: "Failed to add to favorites" });
  }
});

// Remove from Favorites
router.delete("/remove", async (req, res) => {
    const { propertyId } = req.body;
  
    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }
  
    try {
      // Check if the property exists in the favorites table
      const checkExisting = await pool.query(
        "SELECT * FROM favorites WHERE property_id = $1",
        [propertyId]
      );
  
      if (checkExisting.rows.length === 0) {
        return res.status(400).json({ error: "Property is not in your favorites" });
      }
  
      // Remove the property from the favorites table
      const result = await pool.query(
        "DELETE FROM favorites WHERE property_id = $1 RETURNING *",
        [propertyId]
      );
  
      if (result.rowCount === 0) {
        return res.status(400).json({ error: "Failed to remove property from favorites" });
      }
  
      res.status(200).json({ message: "Property removed from favorites" });
    } catch (err) {
      console.error("Error removing from favorites:", err);
      res.status(500).json({ error: "Failed to remove from favorites" });
    }
  });

// Get Favorites
router.get("/get", async (req, res) => {

  try {
    // Retrieve property details by joining properties and favorites tables
    const result = await pool.query(
      `
      SELECT p.*, f.id AS favorite_id
      FROM properties p
      JOIN favorites f ON p.id = f.property_id
      `,
    );

    if (result.rows.length === 0) {
      return res.status(301).json({ error: "Property not found in favorites" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving favorites:", err);
    res.status(500).json({ error: "Failed to retrieve favorites" });
  }
});



module.exports = router;