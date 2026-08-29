import api from "./api";

export const getMyProjects = async()=>{
    const res = await api.get("/api/projects/my-projects");
    console.log(res);
    return res.data.projects;
}

export const createProject = async(projectData)=>{
    const res = await api.post("/api/projects",projectData);
    return res.data.project;
}

export const getSingleProject = async(id)=>{
    const res = await api.get(`/api/projects/${id}`);
    return res.data.project;
}

export const updateProject = async (id, projectData) => {
  const res = await api.patch(`/api/projects/update/${id}`, projectData);
  return res.data.project;
};

export const submitProject = async (id) => {
  const res = await api.patch(`/api/projects/${id}/submit`);
  console.log(res);
  return res.data.project;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/api/projects/delete/${id}`);
  return res.data;
};

export const getAssignedProjects = async () => {
  const res = await api.get("/api/faculty/projects");
  return res.data.projects;
};

export const getProjectDetails = async (id) => {
  const res = await api.get(`/api/faculty/projects/${id}`);
  return res.data.project;
};

export const reviewProject = async (id, { status, feedback }) => {
  const res = await api.patch(`/api/faculty/project/${id}/review`, { status, feedback });
  return res.data.project;
};

export const addProjectUpdate = async (id, message) => {
  const res = await api.post(`/api/studentprojects/${id}/activities/updates`, { message });
  console.log("updatedd",res)
  return res.data;
};

export const getProjectTimeline = async (id) => {
  const res = await api.get(`/api/studentprojects/${id}/activities/timeline`);
  return res.data.timeline;
};

export const getPublicProjects = async(filters={})=>{
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/api/projects/publicProjects?${params}`);
  return res.data.projects
};

export const getPublicProjectById = async (id) => {
  const res = await api.get(`/api/projects/public/${id}`);
  return res.data.project;
};