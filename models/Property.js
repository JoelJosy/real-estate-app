const pool = require("../config/db");

const createPropertyTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS properties (
      id SERIAL PRIMARY KEY,
      "Title" TEXT,
      "Price" NUMERIC,
      "Seller_id" INT,
      "NoOfBedrooms" INT,
      "NoOfBathrooms" INT,
      "PropertyType" TEXT,
      "FloorArea" NUMERIC,
      "BERRating" TEXT,
      "Latitude" NUMERIC,
      "Longitude" NUMERIC,
      "ListingViews" INT DEFAULT 0,
      "Area" TEXT,
      "County" TEXT,
      "Features" TEXT,
      "DateOfConstruction" TEXT,
      "image1" TEXT,
      "image2" TEXT,
      "image3" TEXT
    );
  `;
  await pool.query(query);
};

module.exports = { createPropertyTable };