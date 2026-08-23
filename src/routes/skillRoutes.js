const express = require("express");
const router = express.Router();
const {
  getAllSkills,
  getSkillCategory,
  getSkillsByCategory,
  createSkillCategory,
  updateSkillCategory,
  addSkillToCategory,
  updateSkillInCategory,
  deleteSkillCategory,
  deleteSkillFromCategory,
  getAllCategories
} = require("../controllers/skillController");

// Public routes
router.get("/", getAllSkills);
router.get("/categories/list", getAllCategories);
router.get("/category/:categoryName", getSkillsByCategory);
router.get("/:id", getSkillCategory);

// Admin/protected routes (add authentication middleware as needed)
// Example: router.post("/", authenticate, authorize('admin'), createSkillCategory);
router.post("/", createSkillCategory);
router.put("/:id", updateSkillCategory);
router.delete("/:id", deleteSkillCategory);

// Skill-specific routes within a category
router.post("/:id/skills", addSkillToCategory);
router.put("/:categoryId/skills/:skillId", updateSkillInCategory);
router.delete("/:categoryId/skills/:skillId", deleteSkillFromCategory);

module.exports = router;