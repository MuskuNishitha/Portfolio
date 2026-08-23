const Profile = require("../models/ProfileModel");

// @desc    Create a new profile
// @route   POST /api/profiles
// @access  Public (You might want to make it private in production)
exports.createProfile = async (req, res) => {
  try {
    // Check if a profile already exists
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists. Use update instead.",
      });
    }

    const profile = new Profile(req.body);
    await profile.save();

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all profiles (usually just one in portfolio)
// @route   GET /api/profiles
// @access  Public
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single profile
// @route   GET /api/profiles/:id
// @access  Public
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get main profile (first profile)
// @route   GET /api/profile
// @access  Public
exports.getMainProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update profile
// @route   PUT /api/profiles/:id
// @access  Private (You might want to add authentication)
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const options = { new: true, runValidators: true };

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      updates,
      options
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update main profile (first profile)
// @route   PUT /api/profile
// @access  Private
exports.updateMainProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "Profile not found",
      });
    }

    const updates = req.body;
    const options = { new: true, runValidators: true };

    Object.keys(updates).forEach((key) => {
      profile[key] = updates[key];
    });

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Partial update profile
// @route   PATCH /api/profiles/:id
// @access  Private
exports.partialUpdateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const options = { new: true, runValidators: true };

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      options
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Search profiles by criteria
// @route   GET /api/profiles/search
// @access  Public
exports.searchProfiles = async (req, res) => {
  try {
    const { role, available, freelance, language } = req.query;
    const query = {};

    if (role) query.role = { $in: [role] };
    if (available) query.available = available === 'true';
    if (freelance) query.freelance = freelance === 'true';
    if (language) query.languages = { $in: [language] };

    const profiles = await Profile.find(query);

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get profile stats
// @route   GET /api/profiles/stats
// @access  Public
exports.getProfileStats = async (req, res) => {
  try {
    const profiles = await Profile.find();

    const stats = {
      totalProfiles: profiles.length,
      availableProfiles: profiles.filter(p => p.available).length,
      freelanceAvailable: profiles.filter(p => p.freelance).length,
      roles: {},
      languages: {},
    };

    // Count roles
    profiles.forEach(profile => {
      profile.role.forEach(role => {
        stats.roles[role] = (stats.roles[role] || 0) + 1;
      });
      
      // Count languages
      profile.languages?.forEach(lang => {
        stats.languages[lang] = (stats.languages[lang] || 0) + 1;
      });
    });

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};