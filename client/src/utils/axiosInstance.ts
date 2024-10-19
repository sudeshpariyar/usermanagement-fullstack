import axios from "axios";
import { SERVER_API_KEY } from "./globalConfig";

const axiosInstance = axios.create({
  baseURL: SERVER_API_KEY,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response) || "Axios Error")
);
export default axiosInstance;
