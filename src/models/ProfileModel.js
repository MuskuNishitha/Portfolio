const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: [String],
      required: true,
    },
    tagline: { type: String },
    description: { type: String },
    profileImage: { type: String },
    birthdate: { type: String },
    resumeUrl: { type: String },
    available: { type: Boolean, default: false }, // Personal info
    address: { type: String },
    Experience: { type: String },
    nationality: { type: String },
    completedProjects: { type: String },
    happycustomers: { type: String },
    languages: [String],
    email: { type: String },
    phone: { type: String },
    linkedin: { type: String },
    github: { type: String },
    freelance: { type: Boolean, default: false }, // true = Available, false = Not Available
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
