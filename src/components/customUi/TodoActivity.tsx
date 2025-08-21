import type { TodosProps } from "./Todos";

function TodoActivity({ data, isLoading, isError }: Omit<TodosProps, "error">) {
    if (isLoading) {
        <span className='italic'>Loading...</span>;
    }

    if (isError) {
        <span className='italic text-red-500'>Error loading activity</span>;
    }

    return (
        <p>
            {data?.todos.length ? (
                <>
                    <span>
                        {data?.todos.filter(todo => !todo.completed).length}{" "}
                        active,{" "}
                    </span>
                    <span>
                        {data?.todos.filter(todo => todo.completed).length}{" "}
                        completed
                    </span>{" "}
                </>
            ) : (
                <span className='italic'>No activity yet</span>
            )}
        </p>
    );
}

export default TodoActivity;
