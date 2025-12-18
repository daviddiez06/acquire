// models/PreparedSample.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreparedSampleSchema = new Schema({
  features: {
    type: [Number],
    required: true
  },

  featureCount: {
    type: Number,
    required: true
  },

  targetDate: {
    type: Date,
    required: true
  },

  dailyValues: {
    type: [Number],
    required: true
  },

  kunnaMeta: {
    type: Object,
    required: true
  },

  fetchMeta: {
    type: Object,
    required: true
  },

  scalerVersion: {
    type: String,
    default: "v1"
  },

  createdAt: {
    type: Date,
    default: () => new Date()
  }
});

module.exports = mongoose.model("preparedsamples", PreparedSampleSchema);
