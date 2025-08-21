import AddTodo from "@/components/customUi/AddTodo";
import MenuModal from "@/components/customUi/Menu";
import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import StyledButton from "@/components/customUi/StyledButton";
import TodoActivity from "@/components/customUi/TodoActivity";
import Todos from "@/components/customUi/Todos";
import { useGetTodos } from "@/hooks/useTodos";
import { PlusSquareIcon } from "lucide-react";

const FilterOptions = ["all", "active", "completed"];

function Home() {
    const { data, isLoading, isError, error } = useGetTodos();

    return (
        <PageWrapper>
            <section className='flex justify-between items-start'>
                <div className='space-y-2'>
                    <PageHeader>Your Todos</PageHeader>

                    <TodoActivity
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>

                <MenuModal>
                    <MenuModal.ModalTrigger>
                        <StyledButton variant='ghost' className='gap-2'>
                            <span>Add Todo</span>
                            <PlusSquareIcon />
                        </StyledButton>
                    </MenuModal.ModalTrigger>

                    <MenuModal.ModalContent>
                        <AddTodo />
                    </MenuModal.ModalContent>
                </MenuModal>
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
                                    className='capitalize'>
                                    {filter}
                                </StyledButton>
                            );
                        })}
                    </p>
                </section>

                {/* todo list */}
                <Todos
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                />
            </main>
        </PageWrapper>
    );
}

export default Home;
