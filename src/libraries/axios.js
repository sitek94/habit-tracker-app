import axios from "axios";

const habitTracker = axios.create({
  baseURL: "https://habit-tracker-293718.firebaseio.com"
});

export default habitTracker;
