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
  const res = await api.patch(`/api/faculty/projects/${id}/review`, { status, feedback });
  return res.data.project;
};