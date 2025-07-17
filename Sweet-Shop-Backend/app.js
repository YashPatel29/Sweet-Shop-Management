const express = require("express");
const sweetRoutes = require("./routes/sweetRoutes");

const app = express();

const cors = require("cors");

// Middleware : For cors
app.use(cors());

// Middleware: Parses incoming JSON requests
app.use(express.json());

// Route Middleware: Mount sweet routes at /api/sweets
app.use("/api/sweets", sweetRoutes);

// Health check route (optional, for monitoring or testing)
app.get("/", (req, res) => {
  res.send("Sweet Shop API is running!");
});

module.exports = app;
