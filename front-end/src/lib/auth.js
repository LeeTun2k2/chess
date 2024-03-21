export const setAccessToken = (access_token) => {
    sessionStorage.setItem("access_token", access_token)
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1800 * 1000;
    now.setTime(expireTime);
    sessionStorage.setItem("access_token_expiry", now.toUTCString());
}

export const getAccessTokenExpiry = () => {
    return sessionStorage.getItem("access_token_expiry");
}

export const setRefreshToken = (refresh_token) => {
    sessionStorage.setItem("refresh_token", refresh_token)
}

export const getAccessToken = () => {
    return sessionStorage.getItem("access_token");
}

export const getRefreshToken = () => {
    return sessionStorage.getItem("refresh_token");
}

export const clearTokens = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
}

export const setUserData = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const getUserData = () => {
    return JSON.parse(sessionStorage.getItem("user"));
}