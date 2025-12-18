// services/dateService.js

function computeTargetDate(now = new Date()) {
  const hour = now.getHours();

  // Si son más de las 23 →  mañana
  if (hour >= 23) {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(22, 0, 0, 0); 
    return tomorrow;
  }

  // Si no → hoy
  const today = new Date(now);
  today.setHours(22, 0, 0, 0);
  return today;
}


function computeTimeWindow(targetDate) {
  // time_end = targetDate - 1 día
  const timeEnd = new Date(targetDate);
  timeEnd.setDate(timeEnd.getDate() - 1);

  // time_start = time_end - 3 días
  const timeStart = new Date(timeEnd);
  timeStart.setDate(timeStart.getDate() - 3);

  return { timeStart, timeEnd };
}

module.exports = {
  computeTargetDate,
  computeTimeWindow
};
