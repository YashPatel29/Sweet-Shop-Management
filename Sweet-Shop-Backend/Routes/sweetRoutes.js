const express = require("express");
const router = express.Router();
const sweetController = require("../Controllers/sweetController");

// POST /api/sweets
router.post("/", sweetController.addSweet);

// GET /api/sweets
router.get("/", sweetController.getAllSweets);

module.exports = router;
