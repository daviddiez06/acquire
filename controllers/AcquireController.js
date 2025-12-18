// controllers/AcquireController.js

const { computeTargetDate, computeTimeWindow } = require("../services/dateService");
const { fetchKunnaData } = require("../services/kunnaService");
const { buildFeatures } = require("../services/featureBuilderService");
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

    const targetDate = computeTargetDate();
    const { timeStart, timeEnd } = computeTimeWindow(targetDate);

    const { dailyValues, kunnaMeta, fetchMeta } = await fetchKunnaData(timeStart, timeEnd);

    const features = buildFeatures(dailyValues, targetDate);

    const scalerVersion = process.env.SCALER_VERSION || "v1";

    const saved = await PreparedSample.create({
    features,
    featureCount: features.length,
    dailyValues,
    targetDate,
    kunnaMeta,
    fetchMeta,
    scalerVersion: "v1",
    createdAt: new Date()
    });

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
