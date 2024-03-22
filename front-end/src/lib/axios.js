import axios from "axios";
import { API_PROXY } from "../settings/appSettings";
import { getAccessToken, getRefreshToken, setAccessToken, getAccessTokenExpiry} from "./auth";

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${API_PROXY}/refresh`,
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );

    const newAccessToken = response.data.access_token;
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

axios.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    const accessTokenExpiry = getAccessTokenExpiry();
    if (accessToken && accessTokenExpiry && Date.now() < Date.parse(accessTokenExpiry)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    } 
    else {
      const refreshToken = getRefreshToken();
      if (!accessToken && !refreshToken) {}
      else if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        setAccessToken(newAccessToken);
      } else {
        console.error("Refresh token not found 1");
        throw new Error("Refresh token not found");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error.response.status", error.response.status)
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } else {
        window.location.href = "/login";
        throw new Error("Refresh token not found");
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
