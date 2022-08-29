import axios from "axios";

function axiosServer(token: any): any {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
            Authorization: "Bearer " + token,
            acccept: "application/json",
            "content-type": "application/json",
        },
    });
}

export default axiosServer;
