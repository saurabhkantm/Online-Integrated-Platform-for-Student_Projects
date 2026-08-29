import projectModel from "../model/project.model.js";
import userModel from "../model/user.model.js";
import organizationModel from "../model/organization.model.js";

export async function getAdminOverview(req, res) {
  try {
    const [totalProjects, approved, pending, totalUsers, totalColleges, totalFaculty, totalStudents] =
      await Promise.all([
        projectModel.countDocuments({}),
        projectModel.countDocuments({ status: "approved" }),
        projectModel.countDocuments({ status: "pending_review" }),
        userModel.countDocuments({}),
        organizationModel.countDocuments({}),
        userModel.countDocuments({ role: "faculty" }),
        userModel.countDocuments({ role: "student" }),
      ]);

    const pendingProjects = await projectModel
      .find({ status: "pending_review" })
      .populate("createdBy", "name")
      .populate("organization", "name")
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      stats: { totalProjects, approved, pending, totalUsers, totalColleges, totalFaculty, totalStudents },
      pendingProjects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}