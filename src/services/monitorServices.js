import axios from "axios";
import axiosInstance from "../axiosInstance";

const postNewUrl = async (data) => {
  const resData = await axiosInstance.post("monitor/new_url", data);
  console.log({ resData });
  return resData;
};

const fetchUrls = async () => {
  const resData = await axiosInstance.get("monitor/list_url");
  console.log({ resData });
  return resData.data;
};

const getCurrentStatus = async (id) => {
  const resData = await axiosInstance.get(`monitor/execute/${id}`);
  console.log({ resData });
  return resData;
};

export { postNewUrl, fetchUrls, getCurrentStatus };
