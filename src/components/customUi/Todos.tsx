import { Check, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

function Todos() {
    return (
        <section className='space-y-8'>
            <article
                className='flex flex-col p-3 lg:p-4 space-y-4
     rounded-lg border border-gray-100'>
                <h2 className='text-xl'>Buy Clothes</h2>

                <p className='ml-2 italic'>
                    - Go buy some jeans and shirts Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit.
                </p>

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
        </section>
    );
}

export default Todos;
