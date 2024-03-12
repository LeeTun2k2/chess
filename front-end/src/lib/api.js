import {getAccessToken, getRefreshToken} from './auth';

export const getHeaders = () => {
    const token = getAccessToken();
    return {
        Authorization: `Bearer ${token}`,
    };
}