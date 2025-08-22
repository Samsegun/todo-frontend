import AddTodo from "@/components/customUi/AddTodo";
import Filter from "@/components/customUi/Filter";
import MenuModal from "@/components/customUi/Menu";
import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import StyledButton from "@/components/customUi/StyledButton";
import TodoActivity from "@/components/customUi/TodoActivity";
import Todos from "@/components/customUi/Todos";
import { useGetTodos } from "@/hooks/useTodos";
import { PlusSquareIcon } from "lucide-react";

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
                <Filter />

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
