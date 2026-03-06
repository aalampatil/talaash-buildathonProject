import axios from "axios";

const backendUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SERVER
    : import.meta.env.VITE_BACKEND_URL;

export const axiosApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${backendUrl}/user/refresh-tokens`,
          {},
          { withCredentials: true },
        );

        if (refreshResponse.data.success) {
          return axiosApi(originalRequest); // retry original request
        }
      } catch (refreshError) {
        console.log("Refresh failed", refreshError);
      }
    }

    return Promise.reject(error);
  },
);
