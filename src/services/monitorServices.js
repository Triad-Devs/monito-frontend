import axios from "axios";

const baseURL = "http://localhost:8000/monitor/new_url";

const postNewUrl = async (urlData) => {
  const { data } = await axios.post(baseURL, urlData);
  return data;
};

export { postNewUrl };
