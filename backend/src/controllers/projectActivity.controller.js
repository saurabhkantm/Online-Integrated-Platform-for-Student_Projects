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
const CATEGORY_COLORS = [
  "#F0A868",
  "#4C7CF0",
  "#8B7CF0",
  "#34D399",
  "#F472B6",
  "#FBBF24",
  "#60A5FA",
  "#A78BFA",
  "#F87171",
  "#2DD4BF",
];

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

    // --- categories: build as an array with percent + color, not a plain object ---
    const categoryCounts = {};
    allApproved.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    const totalCategoryCount = allApproved.length;
    const categories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1]) // largest slice first
      .map(([name, count], i) => ({
        name,
        percent: totalCategoryCount > 0 ? Math.round((count / totalCategoryCount) * 100) : 0,
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
      }));

    // count distinct students with at least one approved project
    const distinctParticipants = await projectModel.distinct("createdBy", { status: "approved" });

    // --- topPerformers: highest rated + most viewed from the ranked pool ---
    const highestRated = await projectModel
      .findOne(filter)
      .sort({ averageRating: -1, reviewCount: -1 })
      .select("title averageRating");

    const mostViewed = await projectModel
      .findOne(filter)
      .sort({ viewCount: -1 })
      .select("title viewCount");

    const topPerformers = {
      highestRated: highestRated
        ? { title: highestRated.title, value: highestRated.averageRating?.toFixed(1) }
        : null,
      mostViewed: mostViewed
        ? { title: mostViewed.title, value: String(mostViewed.viewCount || 0) }
        : null,
      mostLiked: null, // not tracked yet
      mostDownloaded: null, // not tracked yet
    };

    // --- attach a stats.views wrapper to each project so the frontend's StatPill picks it up ---
    const projectsWithStats = projects.map((p) => ({
      ...p.toObject(),
      stats: {
        views: p.viewCount || 0,
      },
    }));

    return res.status(200).json({
      success: true,
      projects: projectsWithStats,
      topPerformers,
      categories,
      pagination: {
        page: Number(page),
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalRanked: total,
        avgRatingOverall: Math.round(avgRatingOverall * 100) / 100,
        totalParticipants: distinctParticipants.length,
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