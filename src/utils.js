export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

export const REQUEST_VERBS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export const REPEAT_AFTER = {
  "1 minute": 1,
  "5 Minutes": 5,
  "10 Minutes": 10,
  "15 Minutes": 15,
  "1 Hour": 60,
  "12 Hours": 720,
  "1 Day": 1440,
};
