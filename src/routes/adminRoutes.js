// routes/adminRoutes.js
const express = require("express");
const { 
  registerAdmin, 
  loginAdmin,
  getProfile,
  updateProfile,
  changePassword,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const roleAuth = require("../middlewares/roleAuth");

const router = express.Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected routes - Profile
router.get("/profile", adminAuth, getProfile);
router.put("/profile", adminAuth, updateProfile);
router.put("/change-password", adminAuth, changePassword);

// Protected routes - Admin Management
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id" ,deleteAdmin);

module.exports = router;