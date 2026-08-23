const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContactStatus,
  searchContacts,
  createContactMail
} = require("../controllers/contactController");

// Public routes
router.post("/new", createContactMail);
router.post("/new_gmail", createContactMail);

// Admin routes (protect these with authentication middleware)
// Example: router.get("/", authenticate, authorize("admin"), getAllContacts);

// Get all contacts
router.get("/", getAllContacts);

// Search contacts
router.get("/search", searchContacts);

// Get single contact
router.get("/:id", getContactById);

// Update contact status
router.patch("/:id", updateContactStatus);

// Delete contact
router.delete("/:id", deleteContact);

module.exports = router;