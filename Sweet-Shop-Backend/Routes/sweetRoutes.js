const express = require("express");
const router = express.Router();
const sweetController = require("../Controllers/sweetController");

// POST /api/sweets
router.post("/", sweetController.addSweet);
router.post("/purchase/:id", sweetController.purchaseSweet);
router.post("/restock/:id", sweetController.restockSweet);

// GET /api/sweets
router.get("/", sweetController.getAllSweets);
router.get("/search", sweetController.searchSweets);

// DELETE /api/sweets
router.delete("/:id", sweetController.deleteSweet);

module.exports = router;
