import axios from "axios";

const useEntityApi = (endpoint: string) => {
  const API_BASE_URL = `http://localhost:3000/${endpoint}`;
  
  const createAsync = async <T extends object> (data: T) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create entity");
    }
  };

  const listAsync = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response;
    } catch (error) {
      throw new Error("Failed to list entity");
    }
  };

  const getByIdAsync = async (id: string | number): Promise<any> => {
    try {
      const stringId = id.toString();
      const response = await axios.get(`${API_BASE_URL}/${stringId}`);
      return response
    } catch(error) {
      throw new Error("Failed to get entity")
    }
  };

  const updateAsync = async <T extends object> (id: number | string, data: T) => {
    try {
      const stringId = id.toString();
      const response = await axios.put(`${API_BASE_URL}/${stringId}`, data)
      return response;
    } catch(error) {
      throw new Error("Failed to update entity");
    }
  };

  const deleteAsync = async (id: number | string) => {
    try {
      const stringId = id.toString();
      const response = await axios.delete(`${API_BASE_URL}/${stringId}`);
      return response;
    } catch(error) {
      throw new Error("failed to delete entity")
    }
  }

  return { createAsync, listAsync, getByIdAsync, updateAsync, deleteAsync };
};

export default useEntityApi;