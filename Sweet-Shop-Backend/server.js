const app = require("./app");

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Sweet Shop API is running at http://localhost:${PORT}`);
});
