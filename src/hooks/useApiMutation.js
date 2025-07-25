import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../services/api/apiRequest";

export const useApiMutation = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ method, endpoint, data, config }) => {
            return await apiRequest({ method, endpoint, data, config });
        },

        retry: 1,

        onSuccess: (data, variables) => {

            if (options.invalidateQueries) {
                queryClient.invalidateQueries({ 
                    queryKey: options.invalidateQueries 
                });
            }

            if (options.onSuccess) {
                options.onSuccess(data, variables);
            }

        },

        onError: (error, variables) => {
            console.error('API Mutation Error:', error);
            
            if (options.onError) {
                options.onError(error, variables);
            }
        },
        
        ...options

    });
};