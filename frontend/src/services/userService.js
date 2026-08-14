import api from "./api";

export const getUsersByRole = async(role)=>{
    const res =await api.get(`/api/auth/users?role=${role}`);
    return res.data.users;
}

export const getAllUsers = async () => {
  const res = await api.get("/api/users/all");
  return res.data.users;
};

export const updateUserRole = async (id, role) => {
  const res = await api.patch(`/api/users/${id}/role`, { role });
  return res.data.user;
};

export const toggleSuspendUser = async (id) => {
  const res = await api.patch(`/api/users/${id}/suspend`);
  return res.data.user;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/api/users/${id}`);
  return res.data;
};