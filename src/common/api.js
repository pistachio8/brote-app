import axios from "axios";
import { API_URL } from "./config";

export const apiService = {
  setHeader(token) {
    return (axios.defaults.headers.common["Authorization"] = `Token ${token}`);
  },
  get(resource, params = "") {
    return axios.get(`${API_URL}/${resource}`, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  post(resource, params) {
    return axios.post(`${API_URL}/${resource}`, params);
  },
  update() {},
  delete() {}
};
