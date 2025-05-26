import axios from "axios";

// API public - không cần token
const axiosInstance = axios.create({
  baseURL: "https://localhost:7009/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;


// API protected - tự động đính kèm token Authorization
// const axiosPrivate = axios.create({
//   baseURL: "https://localhost:7009/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor tự động đính kèm token từ localStorage vào header