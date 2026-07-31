import projectModel from "../model/project.model.js";
import userModel from "../model/user.model.js";
import projectActivityModel from "../model/projectActivity.model.js";

export default async function createProject(req, res) {
  const {
    title,
    description,
    category,
    techStack,
    assignedFaculty,
    teamMembers,
    githubLink,
    liveLink,
    documentation,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !Array.isArray(techStack) ||
    techStack.length === 0 ||
    !assignedFaculty
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can create projects.",
      });
    }

    const faculty = await userModel.findById(assignedFaculty);

    if (!faculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty not found",
      });
    }

    if (faculty.role !== "faculty") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a faculty",
      });
    }

    if (faculty.organization.toString() !== req.user.organization.toString()) {
      return res.status(403).json({
        success: false,
        message: "Organization not match",
      });
    }

    const existingProject = await projectModel.findOne({
      title: title,
      createdBy: req.user._id,
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project already existed!",
      });
    }

    const project = await projectModel.create({
      title,
      description,
      category,
      techStack,
      organization: req.user.organization,
      assignedFaculty,
      createdBy: req.user._id,
      teamMembers: teamMembers || [],
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      documentation: documentation || null,
    });

    await projectActivityModel.create({
      project: project._id,
      user: req.user._id,
      action: "PROJECT_STARTED",
      message: "Project started.",
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully!",
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAllProjects(req, res) {
  try {
    const projects = await projectModel
      .find({ createdBy: req.user._id })
      .populate("assignedFaculty", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getSingleProject(req, res) {
  try {
    const project = await projectModel
      .findOne({
        _id: req.params.id,
        createdBy: req.user._id,
      })
      .populate("assignedFaculty", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
}

export async function updateProject(req, res) {
  const { title, description, category, techStack } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !Array.isArray(techStack) ||
    techStack.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const project = await projectModel.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (project.status !== "draft") {
      return res.status(403).json({
        success: false,
        message: "Only draft projects can be updated.",
      });
    }

    project.title = title;
    project.description = description;
    project.category = category;
    project.techStack = techStack;

    await project.save();

    await projectActivityModel.create({
      project: project._id,
      user: req.user._id,
      action: "PROJECT_UPDATED",
      message: "Project details updated.",
    });

    return res.status(200).json({
      success: true,
      message: "Project Updated Successfully!",
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await projectModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
      status: "draft",
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or cannot be deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
export async function submitProject(req, res) {
  try {
    const project = await projectModel.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (project.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only draft projects can be submitted.",
      });
    }

    if (!project.githubLink) {
      return res.status(400).json({
        success: false,
        message: "Please add a GitHub repository before submitting.",
      });
    }

    project.status = "pending_review";

    await project.save();

    await projectActivityModel.create({
      project: project._id,
      user: req.user._id,
      action: "PROJECT_SUBMITTED",
      message: "Project submitted for review.",
    });

    return res.status(200).json({
      success: true,
      message: "Project submitted successfully for review!",
      project,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getPublicProjects(req, res) {
  try {
    const { search, category, organization, tech } = req.query;

    const filter = { status: "approved" };

    if (category) filter.category = category;
    if (organization) filter.organization = organization;
    if (tech) filter.techStack = { $in: [tech] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const projects = await projectModel
      .find(filter)
      .populate("createdBy", "name")
      .populate("organization", "name code")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getPublicProjectById(req, res) {
  try {
    const project = await projectModel
      .findOne({ _id: req.params.id, status: "approved" })
      .populate("createdBy", "name email")
      .populate("assignedFaculty", "name email")
      .populate("teamMembers", "name email")
      .populate("organization", "name code");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}