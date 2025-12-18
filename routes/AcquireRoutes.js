// routes/AcquireRoutes.js
const express = require("express");
const router = express.Router();

const acquireController = require("../controllers/AcquireController");

router.get("/health", acquireController.health);
router.post("/data", acquireController.createData);

module.exports = router;
