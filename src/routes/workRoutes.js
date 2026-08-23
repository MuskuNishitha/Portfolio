const express = require("express");
const router = express.Router();
const {
  createWork,
  getWorks,
  getWorkById,
  updateWork,
  deleteWork,
  getWorksByCategory,
  searchWorks,
  getCategories,
  getTechStacks,
} = require("../controllers/workController");

// Public routes
router.route("/").get(getWorks);
router.route("/categories/all").get(getCategories);
router.route("/tech-stacks/all").get(getTechStacks);
router.route("/category/:category").get(getWorksByCategory);
router.route("/search/:query").get(searchWorks);
router.route("/:id").get(getWorkById);

// Protected routes (add authentication middleware as needed)
router.route("/").post(createWork);
router.route("/:id").put(updateWork);
router.route("/:id").delete(deleteWork);

module.exports = router;