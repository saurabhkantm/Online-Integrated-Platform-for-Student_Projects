import projectActivityModel from "../model/projectActivity.model.js";
import projectModel from "../model/project.model.js";

export async function addProjectUpdate(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Update message is required.",
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

    await projectActivityModel.create({
      project: project._id,
      user: req.user._id,
      action: "PROJECT_UPDATED",
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Project update added successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
export async function getProjectTimeline(req, res) {
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

    const timeline = await projectActivityModel
      .find({
        project: req.params.id,
      })
      .populate("user", "name role")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      timeline,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
export async function getLeaderboard(req, res) {
  try {
    const { category, organization, limit = 25, page = 1 } = req.query;

    const filter = { status: "approved", reviewCount: { $gt: 0 } };
    if (category) filter.category = category;
    if (organization) filter.organization = organization;

    const skip = (page - 1) * limit;

    const projects = await projectModel
      .find(filter)
      .populate("createdBy", "name")
      .populate("organization", "name code")
      .sort({ averageRating: -1, reviewCount: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await projectModel.countDocuments(filter);

    const allApproved = await projectModel.find({ status: "approved" });
    const avgRatingOverall =
      allApproved.length > 0
        ? allApproved.reduce((sum, p) => sum + (p.averageRating || 0), 0) / allApproved.length
        : 0;

    const categoryBreakdown = {};
    allApproved.forEach((p) => {
      categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
    });

    // NEW: count distinct students with at least one approved project
    const distinctParticipants = await projectModel.distinct("createdBy", { status: "approved" });

    return res.status(200).json({
      success: true,
      projects,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      stats: {
        totalRanked: total,
        avgRatingOverall: Math.round(avgRatingOverall * 100) / 100,
        totalParticipants: distinctParticipants.length,
        categoryBreakdown,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}