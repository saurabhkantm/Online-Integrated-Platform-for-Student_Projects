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