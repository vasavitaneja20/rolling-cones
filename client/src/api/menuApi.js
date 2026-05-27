import API from "./axios";

export const getMenuItems = async () => {
  const response = await API.get("/menu");

  return response.data;
};