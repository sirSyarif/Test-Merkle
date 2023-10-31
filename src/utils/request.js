import axios from "axios";

// custom axios call for custom header etc

export function request(url, options) {
  return axios.request({
    url,
    ...options,
  });
}
