import { todos } from "@/lib/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CreateTodoInput = {
    title: string;
    description?: string;
    creator: string;
};

export const useGetTodos = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["todos"],
        queryFn: todos.getAll,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    return { data, isLoading, isError, error };
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTodo: CreateTodoInput) => todos.create(newTodo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};
