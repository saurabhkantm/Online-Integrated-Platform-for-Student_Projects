import axios from "axios";

const api = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL
})

export const getOrganization = async()=>{
    const res = await api.get("/api/organizations/getOrg");
    return res.data;
}

export const setOrganization = async(orgdata)=>{
    const res = await api.post("/api/organizations/setOrg",orgdata);
    console.log(res);
    return res.data
}

export const getLeaderboard = async ({ page = 1, limit = 10, category, organization } = {}) => {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);
  if (category) params.set("category", category);
  if (organization) params.set("organization", organization);

  const res = await api.get(`/api/studentprojects/leaderboard?${params.toString()}`);
  return res.data; 
};

