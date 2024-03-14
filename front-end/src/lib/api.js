import {getAccessToken} from './auth';

export const getHeaders = () => {
    const token = getAccessToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}