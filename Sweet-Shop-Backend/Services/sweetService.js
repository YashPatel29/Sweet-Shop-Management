const sweets = require("../models/sweetModel");
const validateSweet = require("../utils/validateSweet");

class SweetService {
  // Add sweet service
  addSweet(sweet) {
    const validation = validateSweet(sweet);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    const exists = sweets.some((item) => item.id === sweet.id);
    if (exists) {
      throw new Error("Sweet ID must be unique.");
    }

    // Sanitize inputs
    sweet.name = sweet.name.trim();
    sweet.category = sweet.category.trim();

    sweets.push(sweet);
    return sweet;
  }
}

module.exports = new SweetService();
