import axios from "axios";
import { getUserData } from "./utils";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const userData = getUserData();

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: userData ? `Bearer ${userData.token}` : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
