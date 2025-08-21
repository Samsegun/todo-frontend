import { todos, type UpdateTodoRequest } from "@/lib/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CreateTodoInput = {
    title: string;
    description?: string;
    creator: string;
};

export type UpdateTodo = { id: string; updates: UpdateTodoRequest };

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

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: UpdateTodo) => todos.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: string }) => todos.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};
