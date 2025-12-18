// server.js
// Punto de entrada del servicio ACQUIRE

require("dotenv").config(); // lee .env

const mongoose = require("mongoose");
const app = require("./app"); // nuestra aplicación Express

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// 1. Conectar a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("[MongoDB] Conectado a ACQUIRE");
    // 2. Arrancar servidor HTTP
    app.listen(PORT, () => {
      console.log(`[ACQUIRE] Servicio escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[MongoDB] Error de conexión:", err);
    process.exit(1);
  });
