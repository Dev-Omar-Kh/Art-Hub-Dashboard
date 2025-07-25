import { Axios } from './axiosInstance ';

export const fetchData = async (endpoint) => {
    const response = await Axios.get(endpoint);
    return response.data;
};