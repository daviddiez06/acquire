// services/featureBuilderService.js

function buildFeatures(dailyValues, targetDate) {
  if (!Array.isArray(dailyValues) || dailyValues.length < 3) {
    throw new Error("dailyValues must be an array of 3 numbers");
  }

  // 1. Valores 
  const consumo_t   = dailyValues[0];
  const consumo_t_1 = dailyValues[1];
  const consumo_t_2 = dailyValues[2];

  const hora       = targetDate.getHours();
  const diaSemana  = targetDate.getDay();     
  const mes        = targetDate.getMonth() + 1; 
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
