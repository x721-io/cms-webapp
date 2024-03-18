import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const BASE_REQUEST_OPTIONS = {
    timeout: 5000,
    headers: {
        redirect: "follow",
    },
};

const marketplaceApi = axios.create({
    baseURL: BASE_API_URL,
    ...BASE_REQUEST_OPTIONS,
});

export { marketplaceApi };