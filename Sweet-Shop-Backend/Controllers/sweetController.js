const sweetService = require("../Services/sweetService");

// Add sweet
exports.addSweet = (req, res) => {
  try {
    const addedSweet = sweetService.addSweet(req.body);
    res
      .status(201)
      .json({ message: "Sweet added successfully.", sweet: addedSweet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all sweets
exports.getAllSweets = (req, res) => {
  const sweets = sweetService.getAllSweets();
  res.status(200).json(sweets);
};

// Remove sweet
exports.deleteSweet = (req, res) => {
  try {
    const deleted = sweetService.deleteSweet(parseInt(req.params.id));
    res
      .status(200)
      .json({ message: "Sweet deleted successfully.", sweet: deleted });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Search sweet
exports.searchSweets = (req, res) => {
  const results = sweetService.searchSweets(req.query);
  res.status(200).json(results);
};
