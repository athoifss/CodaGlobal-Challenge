import axios from "axios";
const baseUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data";

export const getRequest = (path) => {
  return axios.get(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
