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
