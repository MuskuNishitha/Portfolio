
const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
  try {
    console.log(req.body ,"req");
    
    const { name, email, password, phone, role, department } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check if admin exists
    const existsByEmail = await Admin.findOne({ email });
    if (existsByEmail) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const existsByPhone = await Admin.findOne({ phone });
    if (existsByPhone) {
      return res.status(400).json({
        success: false,
        message: "Admin with this phone number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "admin",
      department: department || "IT",
      createdBy: req.admin?.id || null
    });

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: adminResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Contact super-admin.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    // Create JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Prepare admin data for response
    const adminData = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      department: admin.department,
      isActive: admin.isActive,
      lastLogin: admin.lastLogin,
    };

    res.json({
      success: true,
      message: "Login successful",
      token,
      data: adminData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL ADMINS
exports.getAllAdmins = async (req, res) => {
  try {
    const { search, role, department, isActive } = req.query;
    
    // Build filter
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') filter.role = role;
    if (department && department !== 'all') filter.department = department;
    if (isActive && isActive !== 'all') filter.isActive = isActive === 'true';

    const admins = await Admin.find(filter)
      .select('-password')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    console.error("Get admins error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ADMIN BY ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
      .select('-password')
      .populate('createdBy', 'name email');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Get admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE ADMIN
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, phone, role, department, isActive } = req.body;
    const adminId = req.params.id;

    // Check if admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Check for duplicate email
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
      admin.email = email;
    }

    // Check for duplicate phone
    if (phone && phone !== admin.phone) {
      const existingAdmin = await Admin.findOne({ phone });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists",
        });
      }
      admin.phone = phone;
    }

    // Update fields
    if (name) admin.name = name;
    if (role) admin.role = role;
    if (department) admin.department = department;
    if (typeof isActive !== 'undefined') admin.isActive = isActive;

    await admin.save();

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.json({
      success: true,
      message: "Admin updated successfully",
      data: adminResponse,
    });
  } catch (error) {
    console.error("Update admin error:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE ADMIN
exports.deleteAdmin = async (req, res) => {
  try {
    console.log(req ,"req");
    console.log(req.params,"req.params");
    
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    await admin.deleteOne();
    res.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id)
      .select('-password')
      .populate('createdBy', 'name email');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (name) admin.name = name;
    if (phone) {
      // Check for duplicate phone
      const existingAdmin = await Admin.findOne({ phone });
      if (existingAdmin && existingAdmin._id.toString() !== admin._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists",
        });
      }
      admin.phone = phone;
    }

    await admin.save();

    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: adminResponse,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const admin = await Admin.findById(req.admin.id);
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};