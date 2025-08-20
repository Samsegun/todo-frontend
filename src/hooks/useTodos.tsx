import { todos } from "@/lib/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useGetTodos = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["todos"],
        queryFn: todos.getAll,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    return { data, isLoading, isError, error };
};
