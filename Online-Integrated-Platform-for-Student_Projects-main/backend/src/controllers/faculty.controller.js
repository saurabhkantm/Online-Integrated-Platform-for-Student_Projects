import projectModel from "../model/project.model.js";
import projectActivityModel from "../model/projectActivity.model.js";

export async function getAssignedProjects(req, res) {
  try {
    const projects = await projectModel
      .find({ assignedFaculty: req.user._id })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error ",
    });
  }
}

export async function getProjectDetails(req, res) {
  try {
    const project = await projectModel
      .findOne({
        _id: req.params.id,
        assignedFaculty: req.user._id,
      })
      .populate("assignedFaculty", "name email")
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email")
      .populate("organization", "name code");

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project not found!",
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

export async function reviewProject(req, res) {
  const { status, feedback } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Review status is required",
    });
  }

  const allowedStatus = ["approved", "rejected", "needs_changes"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid review status",
    });
  }

  try {
    const project = await projectModel.findOne({
      _id: req.params.id,
      assignedFaculty: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.status !== "pending_review") {
      return res.status(400).json({
        success: false,
        message: "Project is not pending review.",
      });
    }

    project.status = status;
    project.feedback = feedback || null;

    await project.save();

    const activity = {
      approved: {
        action: "PROJECT_APPROVED",
        message: "Project approved by faculty.",
      },
      rejected: {
        action: "PROJECT_REJECTED",
        message: "Project rejected by faculty.",
      },
      needs_changes: {
        action: "CHANGES_REQUESTED",
        message: "Faculty requested changes.",
      },
    };

    const { action, message } = activity[status];

    await projectActivityModel.create({
      project: project._id,
      user: req.user._id,
      action,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Project reviewed successfully!",
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
