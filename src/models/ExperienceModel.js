const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g., "React JS Developer Intern"
  },
  startDate: {
    type: Date,
    required: true, // e.g., "2024-07-01"
  },
  endDate: {
    type: Date,
    default: null, // null means "Present"
  },
  location: {
    type: String, // e.g., "Lejhro Technology, Bhubaneswar, Odisha"
  },
  details: {
    type: [String], // Array of bullet points
    default: [],
  },
  type: {
    type: String, // optional: "Work", "Education", "Internship"
    default: "Work",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
