import api from "./api";

export const getProjectReviews = async (projectId) => {
  const res = await api.get(`/api/reviews/${projectId}`);
  return res.data;
};

export const submitReview = async (projectId, { rating, comment }) => {
  const res = await api.post(`/api/reviews/${projectId}`, { rating, comment });
  return res.data.review;
};

