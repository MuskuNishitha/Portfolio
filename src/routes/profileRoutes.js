const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfiles,
  getProfile,
  getMainProfile,
  updateProfile,
  updateMainProfile,
  partialUpdateProfile,
  deleteProfile,
  searchProfiles,
  getProfileStats,
} = require("../controllers/profileController");

// Public routes
router.route("/").get(getProfiles).post(createProfile);
router.route("/main").get(getMainProfile);
router.route("/search").get(searchProfiles);
router.route("/stats").get(getProfileStats);

// Main profile update (usually for single portfolio)
router.route("/profile").get(getMainProfile).put(updateMainProfile);

// Individual profile routes
router
  .route("/:id")
  .get(getProfile)
  .put(updateProfile)
  .patch(partialUpdateProfile)
  .delete(deleteProfile);

module.exports = router;