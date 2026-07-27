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