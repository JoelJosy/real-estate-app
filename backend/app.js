const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./config/db");
const PORT = process.env.PORT || 10000;

const dotenv = require("dotenv");
dotenv.config();

// // Middleware Function
// const authRoute = require("./middleware/authRoute");

// CORS configuration
const corsOptions = {
    origin: [
      "http://localhost:3000", 
      "https://real-estate-app-joeljosys-projects.vercel.app"
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  };
  // Add CORS middleware before routes
  app.use(cors(corsOptions))


const { createUserTable } = require("./models/User");
const { createPropertyTable } = require("./models/Property");
const { createFavoritesTable } = require("./models/Favorites");
const { authenticateToken } = require("./middleware/authMiddleware");

// App Settings
app.use(express.json());
app.use(cookieParser());

// Router Settings
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const propertyRoutes = require('./routes/propertyRoutes');
app.use('/properties', propertyRoutes);

const favoritesRouter = require("./routes/favoritesRoutes"); 
app.use("/favorites", favoritesRouter); 

// Errors
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

app.use(notFound); // 404 handler
app.use(errorHandler); // Global error handler

(async () => {
    try {
        await pool.query("SELECT NOW()");
        console.log("Connected to the database successfully!");
        await pool.query("SET search_path TO public");
        console.log("Schema set to public");
        await createUserTable();
        await createPropertyTable();
        await createFavoritesTable();
        console.log("Database tables are set up");
    } catch (error) {
        console.error("Error setting up tables", error);
    }
})();
  
// Port Listening
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)    
});