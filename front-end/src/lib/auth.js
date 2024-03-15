export const setAccessToken = (access_token) => {
    document.cookie = `access_token=${access_token}; SameSite=Strict; Secure;`;
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1800 * 1000;
    now.setTime(expireTime);
    document.cookie = `access_token_expiry=${now.toUTCString()}; SameSite=Strict; Secure;`;
}

export const getAccessTokenExpiry = () => {
    const cookie = document.cookie;
    const expiry = cookie.split(";").find((c) => c.trim().startsWith("access_token_expiry="));
    if (expiry) {
        return expiry.split("=")[1];
    }
    return null;
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