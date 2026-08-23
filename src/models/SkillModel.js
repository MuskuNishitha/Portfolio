// models/SkillModel.js
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  skills: [
    {
      name: { type: String, required: true },
      icon: { type: String },
      percentage: { type: Number, min: 0, max: 100 },
      priority: { type: Number },
    },
  ],
});

const SkillModel = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

module.exports = SkillModel;
