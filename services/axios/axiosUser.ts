import axios from 'axios';

const axiosUser = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

export default axiosUser 