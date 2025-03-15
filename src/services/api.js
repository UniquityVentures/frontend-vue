import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const api = axios.create({
    // TODO: Setup a proper screen or system for setting the api url in mobile
    baseURL: window.__TAURI__
        ? "http://192.168.0.118:80/"
        : "http://school1.localhost:80/",  
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.getListing = async (app, filter) =>
    (
        await api.get(`api/${app}/all`, {
            params: filter,
        })
    ).data;

api.getDetail = async (app, id) => (await api.get(`api/${app}/${id}`)).data;

api.createItem = async (app, item) => await api.post(`api/${app}/`, item);

api.updateItem = async (app, item) =>
    await api.put(`api/${app}/${item.id}/`, item);

api.deleteItem = async (app, id) => await api.delete(`api/${app}/${id}/`);

api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        const access = authStore.getAccess;
        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const authStore = useAuthStore();
        const original_request = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !original_request._retry
        ) {
            original_request._retry = true;
            const refresh = authStore.getRefresh;
            if (refresh) {
                try {
                    const response = await axios.post("/api/token/refresh/", {
                        refresh: refresh,
                    });
                    authStore.refreshTokens({
                        access: response.data.access,
                        refresh: response.data.refresh,
                    });
                    original_request.headers.Authorization = `Bearer ${response.data.access}`;
                    return api(original_request);
                } catch (refresh_error) {
                    console.error("Token refresh failed ", refresh_error);
                    authStore.logout();
                    window.location.href = "/login";
                }
            } else {
                authStore.logout();
            }
        }
        return Promise.reject(error);
    },
);

const itemsPerPage = 10;

const getRandomImage = (images) =>
    images[Math.floor(Math.random() * images.length)].default;

export { api, itemsPerPage, getRandomImage };
