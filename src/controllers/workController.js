const Work = require("../models/WorkModal");

// @desc    Create a new work
// @route   POST /api/works
// @access  Private
const createWork = async (req, res) => {
  try {
    const work = new Work(req.body);
    await work.save();
    res.status(201).json({
      success: true,
      data: work,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all works
// @route   GET /api/works
// @access  Public
const getWorks = async (req, res) => {
  try {
    const {
      category,
      tech,
      sortBy = "startDate",
      order = "desc",
      limit = 10,
      page = 1,
    } = req.query;

    // Build query
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by technology
    if (tech) {
      query.techStack = { $in: [tech] };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with sorting and pagination
    const works = await Work.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination info
    const total = await Work.countDocuments(query);

    res.status(200).json({
      success: true,
      count: works.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single work by ID
// @route   GET /api/works/:id
// @access  Public
const getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        error: "Work not found",
      });
    }

    res.status(200).json({
      success: true,
      data: work,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Work not found",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update a work
// @route   PUT /api/works/:id
// @access  Private
const updateWork = async (req, res) => {
  try {
    let work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        error: "Work not found",
      });
    }

    // Update work
    work = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators
    });

    res.status(200).json({
      success: true,
      data: work,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Work not found",
      });
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete a work
// @route   DELETE /api/works/:id
// @access  Private
const deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        error: "Work not found",
      });
    }

    await work.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: "Work deleted successfully",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Work not found",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get works by category
// @route   GET /api/works/category/:category
// @access  Public
const getWorksByCategory = async (req, res) => {
  try {
    const works = await Work.find({ category: req.params.category }).sort({
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: works.length,
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Search works by title or description
// @route   GET /api/works/search/:query
// @access  Public
const searchWorks = async (req, res) => {
  try {
    const { query } = req.params;
    const works = await Work.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { shortDescription: { $regex: query, $options: "i" } },
      ],
    }).sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: works.length,
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get unique categories
// @route   GET /api/works/categories/all
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Work.distinct("category");
    res.status(200).json({
      success: true,
      data: categories.filter(Boolean), // Remove empty strings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get unique tech stacks
// @route   GET /api/works/tech-stacks/all
// @access  Public
const getTechStacks = async (req, res) => {
  try {
    const techStacks = await Work.distinct("techStack");
    
    // Flatten and get unique values
    const uniqueTechStacks = [...new Set(techStacks.flat())].filter(Boolean);
    
    res.status(200).json({
      success: true,
      data: uniqueTechStacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createWork,
  getWorks,
  getWorkById,
  updateWork,
  deleteWork,
  getWorksByCategory,
  searchWorks,
  getCategories,
  getTechStacks,
};