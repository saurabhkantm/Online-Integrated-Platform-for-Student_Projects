import userModel from "../model/user.model.js";

export async function getUsersByRole(req,res) {
    try{
        const {role} =req.query;
        const organizationId = req.user.organization;
        const filter = {organization:organizationId};
        if(role){
            filter.role = role;
        } 
        const users = await userModel
        .find(filter)
        .select("name email role")
        .sort({name:1});

        return res.status(200).json({
            success:true,
            users,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}

export async function getAllUsers(req, res) {
  try {
    const users = await userModel
      .find({})
      .populate("organization", "name code")
      .select("-password")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function updateUserRole(req, res) {
  try {
    const { role } = req.body;
    if (!["student", "faculty", "admin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role." });
    }
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function toggleSuspendUser(req, res) {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    user.suspended = !user.suspended;
    await user.save();
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    return res.status(200).json({ success: true, message: "User deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}