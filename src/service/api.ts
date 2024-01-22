import { instance } from "./axiosInstance";

const api = {
    get: async (path: string, successCallback: (data: any) => void, errorCallback: (data: any) => void) => {
        try {
            const response = await instance.get(`${path}`);
            if (response) {
                successCallback(response);
            }
        } catch (error) {
            errorCallback(error)
        }
    },
    post: async (path: string, data: any, successCallback: (data: any) => void, errorCallback: (data: any) => void) => {
        try {
            const response = await instance.post(`${path}`, data);
            if (response) {
                successCallback(response);
            }
        } catch (error) {
            errorCallback(error)
        }
    },
    put: async (path: string, data: any, successCallback: (data: any) => void, errorCallback: (data: any) => void) => {
        try {
            const response = await instance.put(`${path}`, data);
            if (response) {
                successCallback(response);
            }
        } catch (error) {
            errorCallback(error)
        }
    },
    delete: async (path: string, successCallback: (data: any) => void, errorCallback: (data: any) => void) => {
        try {
            const response = await instance.delete(`${path}`);
            if (response) {
                successCallback(response);
            }
        } catch (error) {
            errorCallback(error)
        }
    },
    patch: async (path: string, data: any, successCallback: (data: any) => void, errorCallback: (data: any) => void) => {
        try {
            const response = await instance.patch(`${path}`, data);
            if (response) {
                successCallback(response);
            }
        } catch (error) {
            errorCallback(error)
        }
    },
};

export { api };