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
  try{
    const limit = parseInt(req.query.limit) || 10;
    const topProjects = await projectModel.find({status: "APPROVED",reviewCount: { $gt: 0 } })
    .sort({ averageRating: -1 })
    .limit(limit)
    .populate("createdBy", "name email")
    .select("title description averageRating reviewCount createdBy");


    return res.status(200).json({
      success:true,
      topProjects
    })

  }catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}
