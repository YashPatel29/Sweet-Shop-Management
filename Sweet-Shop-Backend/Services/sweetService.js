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

  // View all sweet
  getAllSweets() {
    return sweets;
  }

  // Remove sweet
  deleteSweet(id) {
    const index = sweets.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Sweet not found.");
    const deleted = sweets.splice(index, 1);
    return deleted[0];
  }

  // Search sweets
  searchSweets({ name, category, minPrice, maxPrice }) {
    return sweets.filter((s) => {
      const matchesName = name
        ? s.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesCategory = category
        ? s.category.toLowerCase() === category.toLowerCase()
        : true;
      const matchesPrice =
        (minPrice === undefined || s.price >= minPrice) &&
        (maxPrice === undefined || s.price <= maxPrice);
      return matchesName && matchesCategory && matchesPrice;
    });
  }

  // Purchase sweet
  purchaseSweet(id, quantity) {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet) throw new Error("Sweet not found.");
    if (sweet.quantity < quantity)
      throw new Error("Not enough stock available.");
    sweet.quantity -= quantity;
    return sweet;
  }

  // Restock sweet
  restockSweet(id, quantity) {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet) throw new Error("Sweet not found.");
    sweet.quantity += quantity;
    return sweet;
  }
}

module.exports = new SweetService();
