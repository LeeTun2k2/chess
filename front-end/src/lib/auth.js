import axios from "axios";
import { API_PROXY } from "../settings/appSettings";

export const setAccessToken = (access_token) => {
    document.cookie = `access_token=${access_token}; SameSite=Strict; Secure;`;
}

export const setRefreshToken = (refresh_token) => {
    document.cookie = `refresh_token=${refresh_token}; SameSite=Strict; Secure; HttpOnly;`;
}

export const getAccessToken = () => {
    const cookie = document.cookie;
    const token = cookie.split(";").find((c) => c.trim().startsWith("access_token="));
    if (token) {
        return token.split("=")[1];
    }
    return null;
}

export const getRefreshToken = () => {
    const cookie = document.cookie;
    const token = cookie.split(";").find((c) => c.trim().startsWith("refresh_token="));
    if (token) {
        return token.split("=")[1];
    }
    return null;
}

export const clearTokens = () => {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export const refresh = () => {
    const refresh_token = getRefreshToken();
    if (refresh_token) {
        const body = { refresh_token };
        axios
            .post(`${API_PROXY}/refresh`, body)
            .then((resp) => {
                setAccessToken(resp.data.access_token);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}