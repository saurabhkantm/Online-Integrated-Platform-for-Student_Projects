import axios from "axios";

const api = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL
})

export const getOrganization = async()=>{
    const res = await api.get("/api/organizations/");
    return res.data;
}