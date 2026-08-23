const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g., "E‑Commerce Website"
  },
  shortDescription: {
    type: String,
    required: true, // one‑line summary
  },
  description: {
    type: String,
    default: "", // longer details if needed
  },
  techStack: {
    type: [String], // e.g., ["React", "Node.js", "MongoDB"]
    default: [],
  },
  liveUrl: {
    type: String, // deployed project URL
    default: "",
  },
  githubUrl: {
    type: String, // deployed project URL
    default: "",
  },
  startDate: {
    type: Date,
    required: true, // e.g., "2024-07-01"
  },
  endDate: {
    type: Date,
    default: null, // null means "Present"
  },
  repoUrl: {
    type: String, // GitHub or GitLab repo
    default: "",
  },
  images: {
    type: [String], // array of image URLs/screenshots
    default: [],
  },
  category: {
    type: String, // optional: "Frontend", "Full‑Stack", "UI/UX"
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Work || mongoose.model("Work", WorkSchema);
