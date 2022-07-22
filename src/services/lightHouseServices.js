import axios from "axios";

const metrics = [
  "performance",
  "seo",
  "accessibility",
  "best-practices",
  "pwa",
];

const getLightHouseUrl = async (data) => {
  const reqData = { ...data, metrics };
  const resData = await axios.post(
    "http://localhost:5000/generate-report",
    reqData
  );
  console.log({ lighthouse: resData });
  return resData.data.reportURL;
};

export { getLightHouseUrl };
