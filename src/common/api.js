import axios from "axios";
import { API_URL, ARTICLE_LIMIT } from "./config";

export const apiService = {
  get(resource, query) {
    return axios
      .get(`${API_URL}/${resource}`, {
        params: {
          offset: query,
          limit: ARTICLE_LIMIT
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  post() {},
  update() {},
  delete() {}
};
