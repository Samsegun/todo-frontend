import { useGetTodos } from "@/hooks/useTodos";
import { Ban, Check, LoaderCircle, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

function Todos() {
    const { data, isLoading, isError, error } = useGetTodos();

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
        <section className='space-y-8'>
            {data?.todos.map(todo => {
                return (
                    <article
                        key={todo._id}
                        className='flex flex-col p-3 lg:p-4 space-y-4
     rounded-lg border border-gray-100'>
                        <h2 className='text-xl capitalize'>{todo.title}</h2>

                        {todo.description && (
                            <p className='ml-2 italic'>- {todo.description}</p>
                        )}

                        <p className='flex items-center justify-end flex-wrap gap-2'>
                            <Button className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] w-20 md:w-auto'>
                                <span className='hidden md:flex'>
                                    {" "}
                                    Mark as completed{" "}
                                </span>
                                <Check />
                            </Button>
                            <Button className='bg-[#ff784b] cursor-pointer hover:bg-[#ff784bbb] w-20 md:w-auto'>
                                <span className='hidden md:flex'>Edit</span>
                                <Pencil />
                            </Button>
                            <Button
                                variant={"destructive"}
                                className='w-20 cursor-pointer md:w-auto'>
                                <span className='hidden md:flex'>Delete</span>
                                <Trash />
                            </Button>
                        </p>
                    </article>
                );
            })}
        </section>
    );
}

export default Todos;
