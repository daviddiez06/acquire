// services/kunnaService.js

const KUNNA_URL = "https://openapi.kunna.es/data/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM2NDEwNjB9.ixb4O5Jgk-e_oPMSsycpD7A_iGVqIl4Ijl2a_kLrT94";

// alias fijo del contador
const ALIAS = "6339651";

/**
 * Llama a Kunna para obtener valores diarios entre [timeStart, timeEnd]
 */
async function fetchKunna(timeStart, timeEnd) {

  const headers = {
    "Content-Type": "application/json"
  };

  const body = {
    time_start: timeStart.toISOString(),
    time_end: timeEnd.toISOString(),

    filters: [
      { filter: "name", values: ["1d"] },
      { filter: "alias", values: [ALIAS] }
    ],

    limit: 100,
    count: false,
    order: "DESC"  // importante: los valores llegan de más reciente a más antiguo
  };

  const response = await fetch(KUNNA_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`KUNNA_BAD_STATUS:${response.status}`);
  }

  const json = await response.json();
  const result = json.result;

  if (!result || !Array.isArray(result.columns) || !Array.isArray(result.values)) {
    throw new Error("KUNNA_INVALID_RESULT");
  }

  return result; // { columns, values }
}


/**
 * Convierte el resultado de Kunna en dailyValues, kunnaMeta y fetchMeta
 */
async function fetchKunnaData(timeStart, timeEnd) {

  const result = await fetchKunna(timeStart, timeEnd);
  
 

    const idxValue = result.columns.indexOf("value");
    const idxTimestamp = result.columns.indexOf("time");


  if (idxValue === -1 || idxTimestamp === -1) {
    throw new Error("KUNNA_MISSING_COLUMNS: value or time not found");
  }

  // Values ya viene ordenado DESC → [día más reciente, día anterior, ...]
  const dailyValues = result.values.slice(0, 3).map(v => v[idxValue]);

  const daysUsed = result.values.slice(0, 3).map(v => v[idxTimestamp]);

  const kunnaMeta = {
    alias: ALIAS,
    name: "1d",
    daysUsed
  };

  const fetchMeta = {
    timeStart,
    timeEnd,
    source: "acquire"
  };

  return {
    dailyValues,
    kunnaMeta,
    fetchMeta
  };
}

module.exports = {
  fetchKunnaData
};

