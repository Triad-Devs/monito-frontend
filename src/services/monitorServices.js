import axios from "axios";
import axiosInstance from "../axiosInstance";

const postNewUrl = async (data) => {
  const { resData } = await axiosInstance.post("monitor/new_url", data);
  console.log({ resData });
  return resData;
};

export { postNewUrl };
