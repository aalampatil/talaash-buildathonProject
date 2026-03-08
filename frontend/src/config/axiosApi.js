import axios from "axios";
import Cookies from "js-cookie";

const backendUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SERVER
    : import.meta.env.VITE_BACKEND_URL;

export const axiosApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Axios response interceptor
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent retrying the refresh token request itself
    if (originalRequest.url.includes("/refresh-tokens")) {
      return Promise.reject(error);
    }

    // Only once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const refreshResponse = await axios.post(
          `${backendUrl}/user/refresh-tokens`,
          {},
          { withCredentials: true }, // send refreshToken cookie
        );

        if (refreshResponse.data.success) {
          // Update the original request with the new access token from cookie
          const newAccessToken = Cookies.get("accessToken");
          if (newAccessToken) {
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
          }

          // Retry the original request
          return axiosApi(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Optional: redirect to login page
        if (import.meta.env.MODE === "production") {
          window.location.href = import.meta.env.VITE_CLIENT + "/login";
        } else {
          window.location.href = "http://localhost:5173/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

// Optional: inject Authorization header for all requests automatically
axiosApi.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
