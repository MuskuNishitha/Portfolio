
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"],
      trim: true
    },
    email: { 
      type: String, 
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
      type: String, 
      required: [true, "Password is required"],
      minlength: 6
    },
    phone: { 
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    role: { 
      type: String, 
      enum: ["admin", "super-admin", "moderator", "support"], 
      default: "admin" 
    },
    department: {
      type: String,
      enum: ["IT", "Sales", "Marketing", "Support", "Operations", "Finance", "HR"],
      default: "IT"
    },
    isActive: { type: Boolean, default: true },
    profilePicture: {
      type: String,
      default: ""
    },
    lastLogin: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);