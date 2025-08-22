import { useMemo } from "react";
import type { TodosProps } from "./Todos";

function TodoActivity({
    data,
    currentFilter,
}: Omit<TodosProps, "isLoading" | "isError" | "error"> & {
    currentFilter: string;
}) {
    const { activeCount, completedCount } = useMemo(() => {
        if (!data?.todos) return { activeCount: 0, completedCount: 0 };

        const active = data.todos.filter(todo => !todo.completed).length;
        const completed = data.todos.filter(todo => todo.completed).length;

        return { activeCount: active, completedCount: completed };
    }, [data]);

    if (!data) {
        return null;
    }

    if (data.todos.length === 0) {
        return (
            <p>
                <span className='italic'>No activity yet</span>
            </p>
        );
    }

    const renderActivities = () => {
        switch (currentFilter) {
            case "active":
                return <span>{activeCount} active</span>;
            case "completed":
                return <span>{completedCount} completed</span>;

            default:
                return (
                    <>
                        <span>{activeCount} active, </span>
                        <span>{completedCount} completed</span>
                    </>
                );
        }
    };

    return <p>{renderActivities()}</p>;
}

export default TodoActivity;
