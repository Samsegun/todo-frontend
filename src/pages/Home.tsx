import Button from "@/components/customUi/Button";
import { PlusSquareIcon } from "lucide-react";

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

                    {/* <button
                        className='pointer-events-none md:pointer-events-auto cursor-pointer flex items-center gap-2 transition-colors
                     duration-150 hover:bg-gray-700 p-2 rounded-xl'>
                        <span>Add Todo</span>
                        <PlusSquareIcon />
                    </button> */}

                    <Button style={"gap-2 p-2 rounded-xl"}>
                        <span>Add Todo</span>
                        <PlusSquareIcon />
                    </Button>
                </section>

                <main>
                    <section className='my-8'>
                        <p
                            className='w-fit flex items-center space-x-1
                     rounded-lg shadow-sm border border-gray-200'>
                            <Button style='px-4 py-2 rounded-lg'>All</Button>
                            <Button style='px-4 py-2 rounded-lg'>Active</Button>
                            <Button style='px-4 py-2 rounded-lg'>
                                Completed
                            </Button>
                        </p>
                    </section>

                    <section>
                        {/* buutoncolors to use: edit(#ff784b), delete(#ef4444), #32bc9b */}
                        <article>Buy clothes</article>
                        <article>Buy groceries</article>
                        <article>Go diving</article>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Home;
