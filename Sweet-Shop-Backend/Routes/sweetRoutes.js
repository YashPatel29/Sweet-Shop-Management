const express = require("express");
const router = express.Router();
const sweetController = require("../Controllers/sweetController");

// POST /api/sweets
router.post("/", sweetController.addSweet);

module.exports = router;
