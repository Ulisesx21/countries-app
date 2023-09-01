import { instance } from "../utils/config/axios.config";

export const getAll = async () => {
  try {
    const response = await instance.get("/all");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getByName = async (name) => {
  try {
    const response = await instance.get(`/name/${name}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getByFullName = async (name) => {
  try {
    const response = await instance.get(`name/${name}?fullText=true`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getByRegion = async (value) => {
  try {
    const response = await instance.get(`region/${value}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
