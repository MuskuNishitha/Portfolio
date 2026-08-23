const SkillModel = require("../models/SkillModel");

// @desc    Get all skill categories with skills
// @route   GET /api/skills
// @access  Public
const getAllSkills = async (req, res) => {
  try {
    const skills = await SkillModel.find().sort({ category: 1 });
    
    // Transform the data to a more usable format if needed
    const transformedSkills = skills.map(category => ({
      id: category._id,
      category: category.category,
      skills: category.skills.sort((a, b) => (a.priority || 0) - (b.priority || 0))
    }));
    
    res.status(200).json({
      success: true,
      count: skills.length,
      data: transformedSkills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Get single skill category by ID
// @route   GET /api/skills/:id
// @access  Public
const getSkillCategory = async (req, res) => {
  try {
    const skillCategory = await SkillModel.findById(req.params.id);
    
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill category not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: skillCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Get skills by category name
// @route   GET /api/skills/category/:categoryName
// @access  Public
const getSkillsByCategory = async (req, res) => {
  try {
    const skillCategory = await SkillModel.findOne({ 
      category: { $regex: new RegExp(req.params.categoryName, 'i') } 
    });
    
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: skillCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Create new skill category
// @route   POST /api/skills
// @access  Private/Admin
const createSkillCategory = async (req, res) => {
  try {
    const { category, skills } = req.body;
    
    // Validate required fields
    if (!category || !skills || !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: "Please provide category and skills array"
      });
    }
    
    // Check if category already exists
    const existingCategory = await SkillModel.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists"
      });
    }
    
    // Validate each skill in the array
    for (const skill of skills) {
      if (!skill.name) {
        return res.status(400).json({
          success: false,
          message: "Each skill must have a name"
        });
      }
      if (skill.percentage && (skill.percentage < 0 || skill.percentage > 100)) {
        return res.status(400).json({
          success: false,
          message: "Percentage must be between 0 and 100"
        });
      }
    }
    
    const newSkillCategory = await SkillModel.create({
      category,
      skills
    });
    
    res.status(201).json({
      success: true,
      message: "Skill category created successfully",
      data: newSkillCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Update skill category
// @route   PUT /api/skills/:id
// @access  Private/Admin
const updateSkillCategory = async (req, res) => {
  try {
    const { category, skills } = req.body;
    
    // Find the skill category
    let skillCategory = await SkillModel.findById(req.params.id);
    
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill category not found"
      });
    }
    
    // Check if category is being changed and if the new category already exists
    if (category && category !== skillCategory.category) {
      const existingCategory = await SkillModel.findOne({ category });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists"
        });
      }
    }
    
    // Update fields
    if (category) skillCategory.category = category;
    if (skills && Array.isArray(skills)) {
      // Validate each skill in the array
      for (const skill of skills) {
        if (skill.percentage && (skill.percentage < 0 || skill.percentage > 100)) {
          return res.status(400).json({
            success: false,
            message: "Percentage must be between 0 and 100"
          });
        }
      }
      skillCategory.skills = skills;
    }
    
    const updatedSkillCategory = await skillCategory.save();
    
    res.status(200).json({
      success: true,
      message: "Skill category updated successfully",
      data: updatedSkillCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Add skill to existing category
// @route   POST /api/skills/:id/skills
// @access  Private/Admin
const addSkillToCategory = async (req, res) => {
  try {
    const { name, icon, percentage, priority } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required"
      });
    }
    
    if (percentage && (percentage < 0 || percentage > 100)) {
      return res.status(400).json({
        success: false,
        message: "Percentage must be between 0 and 100"
      });
    }
    
    const skillCategory = await SkillModel.findById(req.params.id);
    
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill category not found"
      });
    }
    
    // Check if skill already exists in the category
    const skillExists = skillCategory.skills.some(
      skill => skill.name.toLowerCase() === name.toLowerCase()
    );
    
    if (skillExists) {
      return res.status(400).json({
        success: false,
        message: "Skill already exists in this category"
      });
    }
    
    // Add new skill
    skillCategory.skills.push({
      name,
      icon,
      percentage,
      priority
    });
    
    const updatedCategory = await skillCategory.save();
    
    res.status(200).json({
      success: true,
      message: "Skill added successfully",
      data: updatedCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Update a specific skill within a category
// @route   PUT /api/skills/:categoryId/skills/:skillId
// @access  Private/Admin
const updateSkillInCategory = async (req, res) => {
  try {
    const { name, icon, percentage, priority } = req.body;
    
    if (percentage && (percentage < 0 || percentage > 100)) {
      return res.status(400).json({
        success: false,
        message: "Percentage must be between 0 and 100"
      });
    }
    
    const skillCategory = await SkillModel.findById(req.params.categoryId);
    
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill category not found"
      });
    }
    
    // Find the skill index
    const skillIndex = skillCategory.skills.findIndex(
      skill => skill._id.toString() === req.params.skillId
    );
    
    if (skillIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Skill not found in this category"
      });
    }
    
    // Check if new name conflicts with existing skill (excluding current skill)
    if (name) {
      const skillExists = skillCategory.skills.some(
        (skill, index) => 
          index !== skillIndex && 
          skill.name.toLowerCase() === name.toLowerCase()
      );
      
      if (skillExists) {
        return res.status(400).json({
          success: false,
          message: "Skill with this name already exists in the category"
        });
      }
      
      skillCategory.skills[skillIndex].name = name;
    }
    
    // Update other fields if provided
    if (icon !== undefined) skillCategory.skills[skillIndex].icon = icon;
    if (percentage !== undefined) skillCategory.skills[skillIndex].percentage = percentage;
    if (priority !== undefined) skillCategory.skills[skillIndex].priority = priority;
    
    const updatedCategory = await skillCategory.save();
    
    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updatedCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Delete skill category
// @route   DELETE /api/skills/:id
// @access  Private/Admin
const deleteSkillCategory = async (req, res) => {
  try {
    const skillCategory = await SkillModel.findById(req.params.id);
    
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill category not found"
      });
    }
    
    await skillCategory.deleteOne();
    
    res.status(200).json({
      success: true,
      message: "Skill category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Delete a specific skill from category
// @route   DELETE /api/skills/:categoryId/skills/:skillId
// @access  Private/Admin
const deleteSkillFromCategory = async (req, res) => {
  try {
    const skillCategory = await SkillModel.findById(req.params.categoryId);
    
    if (!skillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill category not found"
      });
    }
    
    // Filter out the skill to be deleted
    const initialLength = skillCategory.skills.length;
    skillCategory.skills = skillCategory.skills.filter(
      skill => skill._id.toString() !== req.params.skillId
    );
    
    if (initialLength === skillCategory.skills.length) {
      return res.status(404).json({
        success: false,
        message: "Skill not found in this category"
      });
    }
    
    await skillCategory.save();
    
    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      data: skillCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Get all unique categories
// @route   GET /api/skills/categories/list
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await SkillModel.distinct('category');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getAllSkills,
  getSkillCategory,
  getSkillsByCategory,
  createSkillCategory,
  updateSkillCategory,
  addSkillToCategory,
  updateSkillInCategory,
  deleteSkillCategory,
  deleteSkillFromCategory,
  getAllCategories
};