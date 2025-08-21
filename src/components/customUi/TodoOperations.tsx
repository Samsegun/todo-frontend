import { useDeleteTodo, useUpdateTodo } from "@/hooks/useTodos";
import type { Todo, UpdateTodoRequest } from "@/lib/apiServices";
import { Check, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

function TodoOperations({ todo }: { todo: Todo }) {
    const updateTodoMutation = useUpdateTodo();
    const deleteTodoMutation = useDeleteTodo();

    async function updateTodo(id: string, updates: UpdateTodoRequest) {
        try {
            await updateTodoMutation.mutateAsync({ id, updates });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='flex items-center justify-end flex-wrap gap-2'>
            {updateTodoMutation.isPending ? (
                <Button
                    disabled
                    className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] w-20 md:w-auto'>
                    Updating...
                </Button>
            ) : (
                <Button
                    disabled={updateTodoMutation.isPending}
                    className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] w-20 md:w-auto'
                    onClick={() =>
                        updateTodo(todo._id, {
                            ...todo,
                            completed: !todo.completed,
                        })
                    }>
                    <span className='hidden md:flex'>
                        {" "}
                        {todo.completed
                            ? "Unmark as complete"
                            : "Mark as completed"}
                    </span>
                    <Check />
                </Button>
            )}

            <Button className='bg-[#ff784b] cursor-pointer hover:bg-[#ff784bbb] w-20 md:w-auto'>
                <span className='hidden md:flex'>Edit</span>
                <Pencil />
            </Button>

            {deleteTodoMutation.isPending ? (
                <Button
                    disabled
                    variant={"destructive"}
                    className='w-20 cursor-pointer md:w-auto'>
                    Deleting...
                </Button>
            ) : (
                <Button
                    disabled={deleteTodoMutation.isPending}
                    variant={"destructive"}
                    className='w-20 cursor-pointer md:w-auto'
                    onClick={() => deleteTodoMutation.mutate({ id: todo._id })}>
                    <span className='hidden md:flex'>Delete</span>
                    <Trash />
                </Button>
            )}
        </section>
    );
}

export default TodoOperations;
