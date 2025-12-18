// controllers/AcquireController.js

const { computeTargetDate, computeTimeWindow } = require("../services/dateService");
const { fetchKunnaData } = require("../services/kunnaService");
const { buildFeatures } = require("../services/featureBuilderService");
const { prepareSample } = require("../services/prepareSample");

const PreparedSample = require("../models/PreparedSample");

// GET /health
function health(req, res) {
  res.json({
    status: "ok",
    service: "acquire"
  });
}

// POST /data
async function createData(req, res) {
  try {
    // 1. Fechas
    const targetDate = computeTargetDate();
    const { timeStart, timeEnd } = computeTimeWindow(targetDate);

    // 2. Kunna (mock)
    const { dailyValues, kunnaMeta, fetchMeta } = await fetchKunnaData(timeStart, timeEnd);

    // 3. Features
    const features = buildFeatures(dailyValues, targetDate);

    // 4. Construir sample final
    const scalerVersion = process.env.SCALER_VERSION || "v1";

    const sampleObj = prepareSample({
      features,
      featureCount: features.length,
      dailyValues,
      targetDate,
      kunnaMeta,
      fetchMeta,
      scalerVersion
    });

    // 5. Guardar en Mongo
    const saved = await PreparedSample.create(sampleObj);

    // 6. Respuesta al orquestador
    return res.status(201).json({
      dataId: saved._id,
      features,
      featureCount: features.length,
      scalerVersion,
      createdAt: saved.createdAt,
      targetDate
    });

  } catch (err) {
    console.error("[ACQUIRE] Error en /data:", err);
    res.status(500).json({ error: "Internal error" });
  }
}

module.exports = {
  health,
  createData
};
