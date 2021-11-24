import axios from "axios";
import api from "./routes";

axios.defaults.baseURL = "http://localhost:3001/api";

axios.interceptors.request.use(
    function (config) {
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        };
        return { ...config, headers };
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const Routes = {
    api,
};

export default axios;