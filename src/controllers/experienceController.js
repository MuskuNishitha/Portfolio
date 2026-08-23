const Experience = require("../models/ExperienceModel");

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single experience
// @route   GET /api/experiences/:id
// @access  Public
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create experience
// @route   POST /api/experiences
// @access  Private (Add authentication middleware as needed)
exports.createExperience = async (req, res) => {
  try {
    // Validate required fields
    const { title, startDate } = req.body;
    if (!title || !startDate) {
      return res.status(400).json({
        success: false,
        error: "Title and startDate are required",
      });
    }

    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private
exports.updateExperience = async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get experiences by type
// @route   GET /api/experiences/type/:type
// @access  Public
exports.getExperiencesByType = async (req, res) => {
  try {
    const experiences = await Experience.find({ 
      type: req.params.type 
    }).sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get current experiences (where endDate is null)
// @route   GET /api/experiences/current
// @access  Public
exports.getCurrentExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ 
      endDate: null 
    }).sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};