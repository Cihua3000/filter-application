// src/api/apiService.ts
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

export const postFilter = async (filter: any) => {
  try {
    const response = await axios.post(`${baseURL}/filter`, filter, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting filter:", error);
    return null;
  }
};

export const getAvailableFilters = async () => {
  try {
    const response = await axios.get(`${baseURL}/filter`);
    return response.data;
  } catch (error) {
    console.error("Error getting filters:", error);
    return null;
  }
};