import api from "./api";

export const getUsersByRole = async(role)=>{
    const res =await api.get(`/api/auth/users?role=${role}`);
    return res.data.users;
}