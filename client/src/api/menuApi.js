import API from "./axios";

export const getMenuItems = async () => {
  const response = await API.get("/api/menu");

  return response.data;
};