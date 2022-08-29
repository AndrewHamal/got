import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { TOKEN_KEY, USER_TYPE_KEY } from '../constants';
import { appDecrypt } from '../helper';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

// request interceptor
axiosClient.interceptors.request.use(function (config) {
    if (!config.headers) return;

    const token = getCookie(TOKEN_KEY);
    if (token) {
        config.headers["Authorization"] = "Bearer " + appDecrypt(token + "");
    }

    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// request interceptor
axiosClient.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        if (error?.response?.status === 401) {
            deleteCookie(TOKEN_KEY);
            deleteCookie(USER_TYPE_KEY);
            await fetch("/api/logout", { method: "POST" });
            window.location.href = "/";
        }

        if (!error?.response?.status) {
            return Promise.reject(error.response);
        }

        return Promise.reject(error?.response);
    }
);

export default axiosClient 