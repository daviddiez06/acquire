// routes/AcquireRoutes.js
const express = require("express");
const router = express.Router();

const acquireController = require("../controllers/AcquireController");

// Contrato básico del servicio ACQUIRE
router.get("/health", acquireController.health);

// De momento, /data solo devuelve algo de prueba
router.post("/data", acquireController.createData);

module.exports = router;
