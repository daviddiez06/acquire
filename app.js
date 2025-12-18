// app.js
// Configuración de Express para ACQUIRE

const express = require("express");
const acquireRoutes = require("./routes/AcquireRoutes");

const app = express();

// Para parsear JSON en los body de las peticiones
app.use(express.json());

// Rutas principales del servicio
app.use("/", acquireRoutes);

module.exports = app;
