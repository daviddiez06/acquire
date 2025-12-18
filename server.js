// server.js

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const acquireRoutes = require("./routes/AcquireRoutes");

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());


app.use("/", acquireRoutes);

// Conexión a MongoDB y arranque del servidor
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("[MongoDB] Conectado a ACQUIRE");

    app.listen(PORT, () => {
      console.log(`[ACQUIRE] Servicio escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[MongoDB] Error de conexión:", err);
    process.exit(1);
  });

