const express = require("express");
const pool = require("../config/db");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Fetch all properties
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM properties");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching properties" });
  }
});

// Fetch property by id
router.get("/by/:id", async (req, res) => {
  const { id } = req.params; // Extract ID from request params

  try {
    const result = await pool.query("SELECT p.*, u.* FROM properties p JOIN users u ON p.\"Seller_id\" = u.user_id WHERE p.id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching property by ID:", err);
    res.status(500).json({ error: "Error fetching property" });
  }
});

// Search/filter properties
router.get("/search", async (req, res) => {
  const { minPrice, maxPrice, area, county, propertyType, minBedrooms, title } = req.query;
  let query = "SELECT * FROM properties WHERE 1=1";
  const values = [];
  let index = 1; // Keep track of parameter index for SQL placeholders ($1, $2, etc.)

  if (minPrice) {
    query += ` AND "Price" >= $${index}`;
    values.push(minPrice);
    index++;
  }
  if (maxPrice) {
    query += ` AND "Price" <= $${index}`;
    values.push(maxPrice);
    index++;
  }
  if (area) {
    query += ` AND "Area" ILIKE $${index}`;
    values.push(`%${area}%`);
    index++;
  }
  if (county) {
    query += ` AND "County" ILIKE $${index}`;
    values.push(`%${county}%`);
    index++;
  }
  if (propertyType) {
    query += ` AND "PropertyType" ILIKE $${index}`;
    values.push(`%${propertyType}%`);
    index++;
  }
  if (minBedrooms) {
    query += ` AND "NoOfBedrooms" >= $${index}`;
    values.push(minBedrooms);
    index++;
  }
  if (title) {
    query += ` AND "Title" ILIKE $${index}`;
    values.push(`%${title}%`);
    index++;
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Database Query Error:", err);
    res.status(500).json({ error: "Error filtering properties" });
  }
});

// Update property details
router.put("/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const { Features } = req.body;

      const updateQuery = `
          UPDATE properties 
          SET "Features" = $1
          WHERE id = $2 RETURNING *;
      `;

      const result = await pool.query(updateQuery, [Features, id]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: "Property not found" });
      }

      res.json({ message: "Property updated successfully", property: result.rows[0] });
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});


// Fetch properties listed by a specific seller
router.get("/seller/:sellerId", async (req, res) => {
  const { sellerId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM properties WHERE \"Seller_id\" = $1", [sellerId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching seller properties" });
  }
});

// Add a new property (only for logged-in sellers)
router.post("/", authenticateToken, async (req, res) => {
  if (req.user.user_type !== "seller") {
    return res.status(403).json({ error: "Only sellers can add properties" });
  }
  
  const {
    Title, Price, NoOfBedrooms, NoOfBathrooms, PropertyType, FloorArea,
    BERRating, Latitude, Longitude, Area, County, Features, DateOfConstruction,
    image1, image2, image3
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO properties (
        "Title", "Price", "Seller_id", "NoOfBedrooms", "NoOfBathrooms", "PropertyType",
        "FloorArea", "BERRating", "Latitude", "Longitude", "Area", "County", "Features",
        "DateOfConstruction", "image1", "image2", "image3"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [Title, Price, req.user.id, NoOfBedrooms, NoOfBathrooms, PropertyType, FloorArea,
        BERRating, Latitude, Longitude, Area, County, Features, DateOfConstruction,
        image1, image2, image3]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error adding property" });
  }
});

// // Update a property (only by the owner)
// router.put("/:id", authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const property = await pool.query("SELECT * FROM properties WHERE id = $1", [id]);
//     if (property.rows.length === 0 || property.rows[0].Seller_id !== req.user.id) {
//       return res.status(403).json({ error: "Unauthorized to edit this property" });
//     }
    
//     const keys = Object.keys(updates);
//     const values = Object.values(updates);
//     let query = "UPDATE properties SET ";

//     keys.forEach((key, index) => {
//       query += `"${key}" = $${index + 1}, `;
//     });
    
//     query = query.slice(0, -2) + ` WHERE id = $${keys.length + 1} RETURNING *`;
//     values.push(id);

//     const result = await pool.query(query, values);
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Error updating property" });
//   }
// });

// Delete a property (only by the owner)
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const property = await pool.query("SELECT * FROM properties WHERE id = $1", [id]);
    if (property.rows.length === 0 || property.rows[0].Seller_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this property" });
    }
    await pool.query("DELETE FROM properties WHERE id = $1", [id]);
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting property" });
  }
});

module.exports = router;
