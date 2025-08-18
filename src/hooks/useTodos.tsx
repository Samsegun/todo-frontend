import { todos } from "@/lib/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useGetTodos = () => {
    const {} = useQuery({
        queryKey: ["todos"],
        queryFn: todos.getAll,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
