import type { Todo } from "@/lib/apiServices";
import { Ban, LoaderCircle } from "lucide-react";
import TodoOperations from "./TodoOperations";

export type TodosProps = {
    data:
        | {
              message: string;
              todos: Todo[];
          }
        | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

function Todos({ data, isLoading, isError, error }: TodosProps) {
    if (isLoading) {
        return (
            <div className='flex justify-center mt-4'>
                <h2>
                    <LoaderCircle size={48} className='animate-spin' />
                </h2>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex justify-center mt-4'>
                <h2 className='flex flex-col items-center gap-2 text-red-500'>
                    <Ban size={48} />

                    <p className='capitalize'>{error?.message}</p>
                </h2>
            </div>
        );
    }

    if (!data?.todos.length) {
        return (
            <section className='text-center text-xl h-48 flex items-center justify-center italic'>
                <p>
                    Your todo list is empty. <br /> Start by clicking on Add
                    Todo button above.{" "}
                </p>
            </section>
        );
    }

    return (
        <section className='space-y-8'>
            {data?.todos.map(todo => {
                return (
                    <article
                        key={todo._id}
                        className='flex flex-col p-3 lg:p-4 space-y-4
     rounded-lg border border-gray-100'>
                        <h2
                            className={`text-xl capitalize ${
                                todo.completed && "line-through"
                            }`}>
                            {todo.title}
                        </h2>

                        {todo.description && (
                            <p
                                className={`ml-2 italic ${
                                    todo.completed && "line-through"
                                }`}>
                                - {todo.description}
                            </p>
                        )}

                        <TodoOperations todo={todo} />
                    </article>
                );
            })}
        </section>
    );
}

export default Todos;
