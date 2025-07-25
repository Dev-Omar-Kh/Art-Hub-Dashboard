import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/api/fetchData";

export const useFetchQuery = (key, endpoint, options = {}) => {
    return useQuery({
        queryKey: [...key],
        queryFn: () => fetchData(endpoint),
        ...options,
    });
};