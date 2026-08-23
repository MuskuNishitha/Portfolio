const express = require("express");
const router = express.Router();
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperiencesByType,
  getCurrentExperiences,
} = require('../controllers/experienceController')

// Public routes
router.get("/", getExperiences);
router.get("/current", getCurrentExperiences);
router.get("/type/:type", getExperiencesByType);
router.get("/:id", getExperience);

// Protected routes (add authentication middleware as needed)
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

module.exports = router;