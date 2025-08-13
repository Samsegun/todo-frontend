import { Button } from "@/components/ui/button";
import { Check, Pencil, PlusSquareIcon, Trash } from "lucide-react";
// import {Card, CardHeader, CardContent} from "@/components/ui/card"

function Home() {
    return (
        <div className='maximum-w container-space'>
            <div className='max-w-[800px] mx-auto md:max-w-[650px]'>
                <section className='flex justify-between items-start'>
                    <div className='space-y-2'>
                        <h1 className='text-2xl'>Your Todos</h1>
                        <p>
                            <span>3 active, </span> <span>0 completed</span>
                        </p>
                    </div>

                    <Button variant='ghost' className='cursor-pointer'>
                        <span>Add Todo</span>
                        <PlusSquareIcon />
                    </Button>
                </section>

                <main>
                    <section className='my-8'>
                        <p
                            className='w-fit flex items-center space-x-1
                     rounded-lg border border-gray-200'>
                            <Button
                                variant={"ghost"}
                                className='cursor-pointer'>
                                All
                            </Button>
                            <Button
                                variant={"ghost"}
                                className='cursor-pointer'>
                                Active
                            </Button>
                            <Button
                                variant={"ghost"}
                                className='cursor-pointer'>
                                Completed
                            </Button>
                        </p>
                    </section>

                    <section className='space-y-8'>
                        {/* buutoncolors to use: edit(#ff784b), delete(#ef4444), #32bc9b */}
                        <article
                            className='flex flex-col p-3 lg:p-4 space-y-4
                     rounded-lg border border-gray-100'>
                            <h2 className='text-xl'>Buy Clothes</h2>

                            <p className='ml-2 italic'>
                                - Go buy some jeans and shirts Lorem ipsum,
                                dolor sit amet consectetur adipisicing elit.
                            </p>

                            <p className='flex items-center justify-end flex-wrap gap-2'>
                                <Button className='bg-[#32bc9c7b] hover:bg-[#325149da] w-20 md:w-auto'>
                                    <span className='hidden md:flex'>
                                        {" "}
                                        Mark as completed{" "}
                                    </span>
                                    <Check />
                                </Button>
                                <Button className='bg-[#ff784b] hover:bg-[#ff784bbb] w-20 md:w-auto'>
                                    <span className='hidden md:flex'>Edit</span>
                                    <Pencil />
                                </Button>
                                <Button
                                    variant={"destructive"}
                                    className='w-20 md:w-auto'>
                                    <span className='hidden md:flex'>
                                        Delete
                                    </span>
                                    <Trash />
                                </Button>
                            </p>
                        </article>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Home;
