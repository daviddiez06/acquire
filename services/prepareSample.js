// services/prepareSample.js

function prepareSample({
  features,
  dailyValues,
  featureCount,
  targetDate,
  kunnaMeta,
  fetchMeta,
  scalerVersion
}) {
  return {
    features,
    featureCount,
    dailyValues,
    targetDate,
    kunnaMeta,
    fetchMeta,
    scalerVersion,
    createdAt: new Date()
  };
}

module.exports = { prepareSample };
