import { Axios } from './axiosInstance ';

export const apiRequest = async ({ method, endpoint, data, config }) => {
    try {
        const response = await Axios({
            method,
            url: endpoint,
            data,
            ...config,
        });

        return response.data;

    } catch (error) {
        console.error('❌ API Error:', error.response?.data?.message || error.message);
        throw error;
    }
};
