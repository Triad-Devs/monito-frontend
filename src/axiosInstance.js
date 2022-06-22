import axios from "axios";
import { getUserData } from "./utils";

const baseURL = "http://127.0.0.1:8000/";

const userData = getUserData();

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: userData ? `Bearer ${userData.token}` : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
