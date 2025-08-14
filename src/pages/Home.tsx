import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import StyledButton from "@/components/customUi/StyledButton";
import Todos from "@/components/customUi/Todos";
import { PlusSquareIcon } from "lucide-react";

const FilterOptions = ["all", "active", "completed"];

function Home() {
    return (
        <PageWrapper>
            <section className='flex justify-between items-start'>
                <div className='space-y-2'>
                    <PageHeader>Your Todos</PageHeader>

                    <p>
                        <span>3 active, </span> <span>0 completed</span>
                    </p>
                </div>

                <StyledButton variant='ghost'>
                    <span>Add Todo</span>
                    <PlusSquareIcon />
                </StyledButton>
            </section>

            <main>
                {/* filters */}
                <section className='my-8'>
                    <p
                        className='w-fit flex items-center space-x-1
                     rounded-lg border border-gray-200'>
                        {FilterOptions.map(filter => {
                            return (
                                <StyledButton
                                    key={filter}
                                    variant={"ghost"}
                                    styles='capitalize'>
                                    {filter}
                                </StyledButton>
                            );
                        })}
                    </p>
                </section>

                {/* todo list */}
                <Todos />
            </main>
        </PageWrapper>
    );
}

export default Home;
