// services/featureBuilderService.js

/**
 * Construye las 7 features necesarias para el modelo MLP.
 *
 * dailyValues = [t, t-1, t-2]
 * targetDate = fecha para la predicción (Date)
 */
function buildFeatures(dailyValues, targetDate) {
  if (!Array.isArray(dailyValues) || dailyValues.length < 3) {
    throw new Error("dailyValues must be an array of 3 numbers");
  }

  // 1. Valores de consumo (los 3 días previos)
  const consumo_t   = dailyValues[0];
  const consumo_t_1 = dailyValues[1];
  const consumo_t_2 = dailyValues[2];

  // 2. Componentes temporales de la fecha objetivo
  const hora       = targetDate.getHours();
  const diaSemana  = targetDate.getDay();     // 0–6
  const mes        = targetDate.getMonth() + 1; // 1–12
  const diaMes     = targetDate.getDate();   

  return [
    consumo_t,
    consumo_t_1,
    consumo_t_2,
    hora,
    diaSemana,
    mes,
    diaMes
  ];
}

module.exports = {
  buildFeatures
};
