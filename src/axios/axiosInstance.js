import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://guarded-sea-29844.herokuapp.com",
});

export default axiosInstance;
