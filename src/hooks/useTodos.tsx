import { todos, type Todo, type UpdateTodoRequest } from "@/lib/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type CreateTodoInput = {
    title: string;
    description?: string;
    creator: string;
};

export type UpdateTodo = { id: string; updates: UpdateTodoRequest };

export const useGetTodos = (filter = "all") => {
    const { data, isLoading, isError, error } = useQuery<{
        message: string;
        todos: Todo[];
    }>({
        queryKey: ["todos", filter],
        queryFn: () => todos.getAll(filter),
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
            toast.success("Todo successfully created");
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: err => toast.error(err.message),
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: UpdateTodo) => todos.update(id, updates),
        onSuccess: () => {
            toast.success("Todo successfully updated");

            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: err => toast.error(err.message),
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: string }) => todos.delete(id),
        onSuccess: () => {
            toast.success("Todo successfully deleted");

            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: err => toast.error(err.message),
    });
};
