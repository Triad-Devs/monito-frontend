import axiosInstance from "../axiosInstance";

const postNewUrl = async (data) => {
  const resData = await axiosInstance.post("monitor/new_url", data);
  console.log({ resData });
  return resData;
};

const fetchUrls = async () => {
  const resData = await axiosInstance.get("monitor/list_url");
  return resData.data;
};

const getCurrentStatus = async (id) => {
  const resData = await axiosInstance.get(`monitor/execute/${id}`);
  return resData;
};

const getDetails = async (id) => {
  const resData = await axiosInstance.get(`monitor/url_details/${id}`);
  return resData;
};

const getStatistics = async (id) => {
  const resData = await axiosInstance.get(`monitor/stats/${id}`);
  return resData;
};

export { postNewUrl, fetchUrls, getCurrentStatus, getDetails, getStatistics };
