import api from "./api";
export const getAdminOverview = async () => {
  const res = await api.get("/api/admin/overview");
  return res.data;
};