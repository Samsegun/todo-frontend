import { useDeleteTodo } from "@/hooks/useTodos";
import type { Todo } from "@/lib/apiServices";
import { useMenuModalContext } from "./Menu";
import StyledButton from "./StyledButton";

function DeleteTodo({ todo }: { todo: Todo }) {
    const deleteTodoMutation = useDeleteTodo();
    const { closeMenu } = useMenuModalContext();

    return (
        <section className='space-y-8 px-4 py-2 text-xl'>
            <p className='text-2xl text-center font-bold my-4'>
                Confirm delete todo?
            </p>

            <p className='flex justify-center py-4 gap-2'>
                <StyledButton
                    type='button'
                    disabled={deleteTodoMutation.isPending}
                    variant={"destructive"}
                    onClick={closeMenu}>
                    Cancel
                </StyledButton>

                <StyledButton
                    type='button'
                    disabled={deleteTodoMutation.isPending}
                    variant={"todoOps"}
                    onClick={() => deleteTodoMutation.mutate({ id: todo._id })}>
                    {deleteTodoMutation.isPending ? "Deleting" : "Confirm"}
                </StyledButton>
            </p>
        </section>
    );
}

export default DeleteTodo;
