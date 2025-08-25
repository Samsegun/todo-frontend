import { useGetTodos } from "@/hooks/useTodos";
import { Ban, LoaderCircle } from "lucide-react";
import { useMemo } from "react";

function QuickStats() {
    const { data, isLoading, isError, error } = useGetTodos();

    const { activeCount, completedCount, totalCount } = useMemo(() => {
        if (!data?.todos)
            return { activeCount: 0, completedCount: 0, totalCount: 0 };

        const active = data.todos.filter(todo => !todo.completed).length;
        const completed = data.todos.filter(todo => todo.completed).length;

        return {
            activeCount: active,
            completedCount: completed,
            totalCount: data.todos.length,
        };
    }, [data]);

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

    return (
        <section>
            <article
                className='p-3 lg:p-4
     rounded-lg border border-gray-100'>
                <h2 className='mb-4 text-xl font-bold md:text-2xl'>
                    Quick Stats
                </h2>

                <ul className='text-lg md:text-xl space-y-4'>
                    <li className='flex justify-between items-center'>
                        <span>Total Todos</span>
                        <span>{totalCount}</span>
                    </li>
                    <li className='flex justify-between items-center'>
                        <span>Completed</span>
                        <span className='text-[#32bc9c7b]'>
                            {completedCount}
                        </span>
                    </li>
                    <li className='flex justify-between items-center'>
                        <span>Active(In Progress)</span>
                        <span className='text-[#ff784b]'>{activeCount}</span>
                    </li>
                </ul>
            </article>
        </section>
    );
}

export default QuickStats;
