const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["unread", "read", "replied", "archived"],
    default: "unread",
  },
  phone: {
    type: String,
    default: "",
  },
  freelance:{
    type:Boolean,
    default:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
