import axios from "axios";
import { API_URL } from "./config";

export const ApiService = {
  setHeader(token) {
    return (axios.defaults.headers.common["Authorization"] = `Token ${token}`);
  },
  query(resource, params = "") {
    return axios.get(`${API_URL}/${resource}`, { params }).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  get(resource, slug = "") {
    return axios.get(`${API_URL}/${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  post(resource, params) {
    return axios.post(`${API_URL}/${resource}`, params);
  },
  update(resource, slug, params) {
    return axios.put(`${API_URL}/${resource}/${slug}`, params);
  },
  put(resource, params) {
    return axios.put(`${API_URL}/${resource}`, params);
  },
  delete(resource) {
    return axios.delete(`${API_URL}/${resource}`);
  }
};

export const ArticlesService = {
  create(params) {
    return ApiService.post("articles", { article: params });
  },
  update() {},
  delete() {}
};
